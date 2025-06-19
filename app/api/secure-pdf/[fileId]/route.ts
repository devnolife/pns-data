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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
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
        }
        
        #pdf-canvas {
            max-width: 100%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        
        .loading-spinner {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            color: #6b7280;
        }
        
        .error-message {
            display: none;
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
                    🔄 Memuat PDF yang aman...
                </div>
                <div class="error-message" id="error-message">
                    ❌ Gagal memuat PDF<br>
                    <small>Silakan coba refresh halaman atau hubungi administrator</small>
                </div>
                <canvas id="pdf-canvas" style="display: none;"></canvas>
            </div>
        </div>
    </div>

    <script>
        console.log('🚀 PDF Viewer script starting...');
        
        // Security configurations
        const SECURITY_CONFIG = {
            disableRightClick: true,
            disableTextSelection: true,
            disableKeyboardShortcuts: true,
            disablePrint: true,
            disableScreenshot: true,
            watermarkEnabled: true
        };
        
        // Check if PDF.js is loaded
        if (typeof pdfjsLib === 'undefined') {
            console.error('❌ PDF.js library not loaded');
            showError('PDF.js library gagal dimuat');
        } else {
            console.log('✅ PDF.js library loaded successfully');
            // PDF.js configuration
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        
        // PDF viewer state
        let pdfDocument = null;
        let currentPage = 1;
        let totalPages = 0;
        let currentZoom = 1.0;
        const canvas = document.getElementById('pdf-canvas');
        const ctx = canvas ? canvas.getContext('2d') : null;
        
        function showError(message) {
            console.error('❌ Error:', message);
            document.getElementById('loading').style.display = 'none';
            const errorDiv = document.getElementById('error-message');
            if (errorDiv) {
                errorDiv.style.display = 'flex';
                errorDiv.innerHTML = \`❌ \${message}<br><small>Silakan coba refresh halaman atau hubungi administrator</small>\`;
            }
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
                overlay.style.display = 'flex';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 2000);
            }
        }
        
        function initSecurity() {
            // Disable right-click
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showSecurityBlock('Right-click dinonaktifkan');
                return false;
            });
            
            // Disable text selection
            document.addEventListener('selectstart', (e) => {
                e.preventDefault();
                return false;
            });
            
            // Disable keyboard shortcuts
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
            
            // Disable drag and drop
            document.addEventListener('dragstart', (e) => {
                e.preventDefault();
                return false;
            });
            
            // Monitor for print attempts
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
                document.getElementById('page-info').textContent = \`Halaman \${pageNum} dari \${totalPages}\`;
                document.getElementById('prev-btn').disabled = pageNum <= 1;
                document.getElementById('next-btn').disabled = pageNum >= totalPages;
                
                canvas.style.display = 'block';
                document.getElementById('loading').style.display = 'none';
                
                console.log(\`✅ Page \${pageNum} rendered successfully\`);
                
            } catch (error) {
                console.error('❌ Error rendering page:', error);
                showError(\`Gagal merender halaman \${pageNum}: \${error.message}\`);
            }
        }
        
        // Load PDF
        async function loadPDF() {
            if (typeof pdfjsLib === 'undefined') {
                showError('PDF.js library tidak tersedia');
                return;
            }
            
            try {
                console.log('📥 Loading PDF document...');
                const pdfData = 'data:application/pdf;base64,${pdfBase64}';
                console.log('📏 PDF data size:', pdfData.length, 'characters');
                
                const loadingTask = pdfjsLib.getDocument(pdfData);
                pdfDocument = await loadingTask.promise;
                totalPages = pdfDocument.numPages;
                
                console.log(\`✅ PDF loaded successfully. Total pages: \${totalPages}\`);
                
                await renderPage(1);
                
            } catch (error) {
                console.error('❌ Error loading PDF:', error);
                showError(\`Gagal memuat PDF: \${error.message}\`);
            }
        }
        
        // Event listeners
        document.getElementById('prev-btn')?.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
            }
        });
        
        document.getElementById('next-btn')?.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
            }
        });
        
        document.getElementById('zoom-in-btn')?.addEventListener('click', () => {
            if (currentZoom < 3.0) {
                currentZoom += 0.25;
                document.getElementById('zoom-info').textContent = \`\${Math.round(currentZoom * 100)}%\`;
                renderPage(currentPage);
            }
        });
        
        document.getElementById('zoom-out-btn')?.addEventListener('click', () => {
            if (currentZoom > 0.5) {
                currentZoom -= 0.25;
                document.getElementById('zoom-info').textContent = \`\${Math.round(currentZoom * 100)}%\`;
                renderPage(currentPage);
            }
        });
        
        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🎬 DOM Content Loaded - Initializing...');
            initSecurity();
            initWatermark();
            
            // Add a small delay to ensure everything is ready
            setTimeout(() => {
                loadPDF();
            }, 100);
        });
        
        // Error handling for PDF.js worker
        window.addEventListener('error', (e) => {
            console.error('❌ Global error:', e.error);
            if (e.error?.name === 'UnexpectedResponseError' || e.message?.includes('pdf.worker')) {
                showError('PDF worker gagal dimuat. Coba refresh halaman.');
            }
        });
        
        // Prevent page unload detection
        window.addEventListener('beforeunload', (e) => {
            console.log('🚪 Page unload detected');
        });
    </script>
</body>
</html>
  `.trim()
} 
