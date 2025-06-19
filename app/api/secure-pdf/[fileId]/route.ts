import { NextRequest, NextResponse } from 'next/server'
import { readFile, access } from 'fs/promises'
import { join } from 'path'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/actions/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    console.log('🔍 Secure PDF request for fileId:', fileId)
    console.log('🎟️ Token provided:', !!token)

    if (!token) {
      console.log('❌ No token provided')
      return new NextResponse('Unauthorized - No token provided', { status: 401 })
    }

    // Validate token and extract user information
    let tokenData
    try {
      tokenData = JSON.parse(atob(token))
      console.log('🎟️ Token decoded successfully:', { userId: tokenData.userId, timestamp: tokenData.timestamp })
    } catch (error) {
      console.log('❌ Invalid token format:', error)
      return new NextResponse('Invalid token format', { status: 401 })
    }

    // Check token expiry (1 hour validity)
    const tokenAge = Date.now() - tokenData.timestamp
    const maxAge = 60 * 60 * 1000 // 1 hour
    if (tokenAge > maxAge) {
      console.log('❌ Token expired. Age:', tokenAge, 'Max age:', maxAge)
      return new NextResponse('Token expired', { status: 401 })
    }

    // Verify user session
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.id !== tokenData.userId) {
      console.log('❌ User session invalid. Current user ID:', currentUser?.id, 'Token user ID:', tokenData.userId)
      return new NextResponse('Unauthorized - Invalid user session', { status: 401 })
    }

    // Get file information from database
    const file = await prisma.uploaded_files.findUnique({
      where: { id: fileId },
      include: {
        reports: {
          select: {
            id: true,
            title: true,
            status: true,
            author_id: true
          }
        }
      }
    })

    if (!file) {
      console.log('❌ File not found in database:', fileId)
      return new NextResponse('File not found', { status: 404 })
    }

    console.log('📄 File found:', {
      id: file.id,
      filename: file.filename,
      mime_type: file.mime_type,
      file_path: file.file_path,
      report_status: file.reports?.status
    })

    // Check if file is PDF
    if (!file.mime_type.includes('pdf')) {
      console.log('❌ File is not PDF:', file.mime_type)
      return new NextResponse('Only PDF files are supported', { status: 400 })
    }

    // Check file access permissions
    const canAccess =
      currentUser.role === 'ADMIN' ||
      currentUser.role === 'MODERATOR' ||
      (file.reports && file.reports.status === 'COMPLETED') ||
      (file.reports && file.reports.author_id === currentUser.id)

    if (!canAccess) {
      console.log('❌ Access denied. User role:', currentUser.role, 'Report status:', file.reports?.status, 'Is author:', file.reports?.author_id === currentUser.id)
      return new NextResponse('Access denied to this file', { status: 403 })
    }

    // Construct file path
    let filePath: string
    if (file.file_path.startsWith('/')) {
      // Already absolute path from root
      filePath = join(process.cwd(), 'public', file.file_path.substring(1))
    } else {
      // Relative path
      filePath = join(process.cwd(), 'public', file.file_path)
    }

    console.log('📁 Attempting to read file from:', filePath)

    // Check if file exists
    try {
      await access(filePath)
      console.log('✅ File exists and is accessible')
    } catch (error: any) {
      console.log('❌ File not accessible:', error)
      // Try alternative paths
      const altPath1 = join(process.cwd(), file.file_path)
      const altPath2 = join(process.cwd(), 'public/uploads', file.filename)

      console.log('🔄 Trying alternative paths...')
      try {
        await access(altPath1)
        filePath = altPath1
        console.log('✅ Found file at alternative path 1:', filePath)
      } catch {
        try {
          await access(altPath2)
          filePath = altPath2
          console.log('✅ Found file at alternative path 2:', filePath)
        } catch {
          console.log('❌ File not found at any path')
          return new NextResponse('File not found on disk', { status: 404 })
        }
      }
    }

    // Read the PDF file
    let fileBuffer: Buffer
    try {
      fileBuffer = await readFile(filePath)
      console.log('✅ PDF file read successfully. Size:', fileBuffer.length, 'bytes')
    } catch (error: any) {
      console.log('❌ Error reading PDF file:', error)
      return new NextResponse('Error reading PDF file', { status: 500 })
    }

    // Generate secure HTML wrapper with PDF.js
    const secureViewer = generateSecurePDFViewer(
      fileBuffer.toString('base64'),
      file.original_name,
      currentUser,
      tokenData.restrictions || {}
    )

    console.log('✅ Secure PDF viewer generated successfully')

    return new NextResponse(secureViewer, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://cdnjs.cloudflare.com; frame-ancestors 'self';",
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    })

  } catch (error: any) {
    console.error('❌ Secure PDF viewer error:', error)
    return new NextResponse(`Internal server error: ${error.message}`, { status: 500 })
  }
}

function generateSecurePDFViewer(
  pdfBase64: string,
  filename: string,
  user: any,
  restrictions: any
): string {
  const watermarkText = `${user.name || user.username} • ${new Date().toLocaleString('id-ID')} • ID:${user.id.slice(-8)}`

  return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure PDF Viewer - ${filename}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f5f5f5;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            overflow-x: hidden;
        }
        
        .security-header {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .security-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .security-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .watermark-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 50;
            overflow: hidden;
        }
        
        .watermark-text {
            position: absolute;
            color: rgba(156, 163, 175, 0.1);
            font-size: 14px;
            font-weight: bold;
            transform: rotate(-45deg);
            white-space: nowrap;
        }
        
        .pdf-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .pdf-viewer {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .pdf-controls {
            background: #f8f9fa;
            padding: 16px 24px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .control-group {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .control-btn {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s;
        }
        
        .control-btn:hover:not(:disabled) {
            background: #4338ca;
        }
        
        .control-btn:disabled {
            background: #d1d5db;
            cursor: not-allowed;
        }
        
        .page-info {
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
        }
        
        .canvas-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background: white;
            min-height: 400px;
        }
        
        #pdf-canvas {
            max-width: 100%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        
        .loading-spinner {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            color: #6b7280;
        }
        
        .error-message {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            color: #dc2626;
            text-align: center;
        }
        
        .security-notice {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            font-size: 14px;
            color: #92400e;
        }
        
        .disabled-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            color: white;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            font-size: 24px;
            font-weight: bold;
        }
        
        .spinner {
            border: 3px solid rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            border-top: 3px solid #3b82f6;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin-bottom: 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media print {
            body { display: none !important; }
        }
    </style>
</head>
<body>
    <!-- Security Header -->
    <div class="security-header">
        <div class="security-info">
            <span>🔒</span>
            <span style="font-weight: 600;">${filename}</span>
            <div class="security-badge">READ-ONLY</div>
            <div class="security-badge">WATERMARKED</div>
        </div>
        <div style="font-size: 12px; opacity: 0.9;">
            Pengguna: ${user.name || user.username} • ${new Date().toLocaleString('id-ID')}
        </div>
    </div>
    
    <!-- Watermark Overlay -->
    <div class="watermark-overlay" id="watermark-overlay"></div>
    
    <!-- Disabled Action Overlay -->
    <div class="disabled-overlay" id="disabled-overlay">
        ⚠️ Aksi Diblokir untuk Keamanan
    </div>
    
    <!-- PDF Container -->
    <div class="pdf-container">
        <!-- Security Notice -->
        <div class="security-notice">
            <strong>⚠️ Pemberitahuan Keamanan:</strong> Dokumen ini dilindungi dengan watermark dan pembatasan akses. 
            Download, print, dan screenshot dinonaktifkan untuk keamanan.
        </div>
        
        <!-- PDF Viewer -->
        <div class="pdf-viewer">
            <div class="pdf-controls">
                <div class="control-group">
                    <button class="control-btn" id="prev-btn" disabled>← Sebelumnya</button>
                    <span class="page-info" id="page-info">Halaman 1 dari 1</span>
                    <button class="control-btn" id="next-btn" disabled>Selanjutnya →</button>
                </div>
                <div class="control-group">
                    <button class="control-btn" id="zoom-out-btn">🔍-</button>
                    <span class="page-info" id="zoom-info">100%</span>
                    <button class="control-btn" id="zoom-in-btn">🔍+</button>
                </div>
            </div>
            
            <div class="canvas-container">
                <div class="loading-spinner" id="loading">
                    <div class="spinner"></div>
                    <div>Memuat PDF yang aman...</div>
                    <small>Harap tunggu beberapa saat</small>
                </div>
                <div class="error-message" id="error-message">
                    <div style="font-size: 48px; margin-bottom: 20px;">❌</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">Gagal memuat PDF</div>
                    <small>Silakan coba refresh halaman atau hubungi administrator</small>
                </div>
                <canvas id="pdf-canvas" style="display: none;"></canvas>
            </div>
        </div>
    </div>

    <!-- Load PDF.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <script>
        console.log('🚀 PDF Viewer script starting...');
        
        // PDF viewer state
        let pdfDocument = null;
        let currentPage = 1;
        let totalPages = 0;
        let currentZoom = 1.0;
        
        // Get DOM elements
        const canvas = document.getElementById('pdf-canvas');
        const loadingDiv = document.getElementById('loading');
        const errorDiv = document.getElementById('error-message');
        const pageInfo = document.getElementById('page-info');
        const zoomInfo = document.getElementById('zoom-info');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        
        const ctx = canvas ? canvas.getContext('2d') : null;
        
        function showError(message) {
            console.error('❌ Error:', message);
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (errorDiv) {
                errorDiv.style.display = 'flex';
                const messageDiv = errorDiv.querySelector('div:nth-child(2)');
                if (messageDiv) messageDiv.textContent = message;
            }
        }
        
        function showLoading() {
            if (loadingDiv) loadingDiv.style.display = 'flex';
            if (errorDiv) errorDiv.style.display = 'none';
            if (canvas) canvas.style.display = 'none';
        }
        
        function hideLoading() {
            if (loadingDiv) loadingDiv.style.display = 'none';
        }
        
        // Initialize watermark
        function initWatermark() {
            const overlay = document.getElementById('watermark-overlay');
            if (!overlay) return;
            
            const watermarkText = '${watermarkText}';
            
            // Create watermark pattern
            for (let i = 0; i < 25; i++) {
                const watermark = document.createElement('div');
                watermark.className = 'watermark-text';
                watermark.textContent = watermarkText;
                watermark.style.top = \`\${(i % 5) * 20 + 10}%\`;
                watermark.style.left = \`\${Math.floor(i / 5) * 20 + 10}%\`;
                overlay.appendChild(watermark);
            }
        }
        
        // Security functions
        function showSecurityBlock(message) {
            const overlay = document.getElementById('disabled-overlay');
            if (overlay) {
                overlay.textContent = \`⚠️ \${message}\`;
                overlay.style.display = 'flex';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 2000);
            }
        }
        
        function initSecurity() {
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showSecurityBlock('Right-click dinonaktifkan');
                return false;
            });
            
            document.addEventListener('selectstart', (e) => {
                e.preventDefault();
                return false;
            });
            
            document.addEventListener('keydown', (e) => {
                const blockedKeys = [
                    'F12', 'PrintScreen',
                    ...(e.ctrlKey ? ['a', 'c', 'v', 'x', 's', 'p', 'u', 'r', 'f', '+', '-', '0'] : [])
                ];
                
                if (blockedKeys.includes(e.key)) {
                    e.preventDefault();
                    showSecurityBlock(\`Tombol \${e.key} diblokir\`);
                    return false;
                }
            });
            
            document.addEventListener('dragstart', (e) => {
                e.preventDefault();
                return false;
            });
            
            window.addEventListener('beforeprint', (e) => {
                e.preventDefault();
                showSecurityBlock('Print dinonaktifkan');
                return false;
            });
        }
        
        // PDF rendering functions
        async function renderPage(pageNum) {
            if (!pdfDocument || !canvas || !ctx) {
                showError('PDF document atau canvas tidak tersedia');
                return;
            }
            
            try {
                console.log(\`📄 Rendering page \${pageNum} of \${totalPages}\`);
                showLoading();
                
                const page = await pdfDocument.getPage(pageNum);
                const viewport = page.getViewport({ scale: currentZoom });
                
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                await page.render(renderContext).promise;
                
                // Update UI
                if (pageInfo) pageInfo.textContent = \`Halaman \${pageNum} dari \${totalPages}\`;
                if (prevBtn) prevBtn.disabled = pageNum <= 1;
                if (nextBtn) nextBtn.disabled = pageNum >= totalPages;
                
                canvas.style.display = 'block';
                hideLoading();
                
                console.log(\`✅ Page \${pageNum} rendered successfully\`);
                
            } catch (error) {
                console.error('❌ Error rendering page:', error);
                showError(\`Gagal merender halaman \${pageNum}\`);
            }
        }
        
        // Load PDF
        async function loadPDF() {
            try {
                console.log('📥 Loading PDF document...');
                
                // Check if PDF.js is loaded
                if (typeof pdfjsLib === 'undefined') {
                    throw new Error('PDF.js library tidak dimuat');
                }
                
                // Configure PDF.js worker
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                
                const pdfData = 'data:application/pdf;base64,${pdfBase64}';
                console.log('📏 PDF data size:', pdfData.length, 'characters');
                
                // Validate base64 PDF data
                if (!pdfData.startsWith('data:application/pdf;base64,') || pdfData.length < 100) {
                    throw new Error('Invalid PDF data format');
                }
                
                const loadingTask = pdfjsLib.getDocument({
                    data: pdfData,
                    verbosity: 0 // Disable verbose logging
                });
                
                pdfDocument = await loadingTask.promise;
                totalPages = pdfDocument.numPages;
                
                console.log(\`✅ PDF loaded successfully. Total pages: \${totalPages}\`);
                
                await renderPage(1);
                
            } catch (error) {
                console.error('❌ Error loading PDF:', error);
                showError(\`Gagal memuat PDF: \${error.message || error}\`);
            }
        }
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderPage(currentPage);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderPage(currentPage);
                }
            });
        }
        
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                if (currentZoom < 3.0) {
                    currentZoom += 0.25;
                    if (zoomInfo) zoomInfo.textContent = \`\${Math.round(currentZoom * 100)}%\`;
                    renderPage(currentPage);
                }
            });
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (currentZoom > 0.5) {
                    currentZoom -= 0.25;
                    if (zoomInfo) zoomInfo.textContent = \`\${Math.round(currentZoom * 100)}%\`;
                    renderPage(currentPage);
                }
            });
        }
        
        // Initialize everything when page loads
        function initViewer() {
            console.log('🎬 Initializing PDF viewer...');
            initSecurity();
            initWatermark();
            
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                loadPDF();
            }, 500);
        }
        
        // Multiple initialization triggers
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initViewer);
        } else {
            initViewer();
        }
        
        // Fallback initialization
        window.addEventListener('load', () => {
            if (!pdfDocument) {
                console.log('🔄 Fallback initialization...');
                initViewer();
            }
        });
        
        // Error handling for PDF.js worker
        window.addEventListener('error', (e) => {
            console.error('❌ Global error:', e.error, e.message);
            if (e.error?.name === 'UnexpectedResponseError' || e.message?.includes('pdf.worker')) {
                showError('PDF worker gagal dimuat. Coba refresh halaman.');
            }
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('❌ Unhandled promise rejection:', e.reason);
            if (e.reason?.message?.includes('pdf') || e.reason?.message?.includes('PDF')) {
                showError('Gagal memproses PDF. Coba refresh halaman.');
            }
        });
        
        console.log('📄 PDF viewer script loaded successfully');
    </script>
</body>
</html>
  `.trim()
} 
