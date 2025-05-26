// Toast messages in Indonesian
const messages = {
  success: {
    default: "Berhasil!",
    dataUpdate: "Data berhasil diperbarui",
    dataCreate: "Data berhasil dibuat",
    dataDelete: "Data berhasil dihapus",
    uploadSuccess: "Berkas berhasil diunggah",
    downloadSuccess: "Berkas berhasil diunduh",
    loginSuccess: "Login berhasil",
    registerSuccess: "Pendaftaran berhasil",
    reportSubmit: "Laporan berhasil dikirim",
    reportVerify: "Laporan berhasil diverifikasi",
    collectionCreate: "Koleksi berhasil dibuat",
    collectionUpdate: "Koleksi berhasil diperbarui",
    collectionDelete: "Koleksi berhasil dihapus",
    profileUpdate: "Profil berhasil diperbarui",
    passwordChange: "Kata sandi berhasil diubah",
    guestbookSubmit: "Pesan buku tamu berhasil dikirim",
    folderCreate: "Folder berhasil dibuat",
    folderUpdate: "Folder berhasil diperbarui",
    folderDelete: "Folder berhasil dihapus",
    userCreate: "Pengguna berhasil dibuat",
    userUpdate: "Pengguna berhasil diperbarui",
    userDelete: "Pengguna berhasil dihapus",
    logoutSuccess: "Logout berhasil",
  },
  error: {
    default: "Terjadi kesalahan",
    validationError: "Validasi gagal",
    serverError: "Terjadi kesalahan pada server",
    networkError: "Kesalahan jaringan",
    authError: "Kesalahan autentikasi",
    permissionError: "Anda tidak memiliki izin",
    notFoundError: "Data tidak ditemukan",
    duplicateError: "Data sudah ada",
    uploadError: "Gagal mengunggah berkas",
    downloadError: "Gagal mengunduh berkas",
    loginFailed: "Login gagal",
    registerFailed: "Pendaftaran gagal",
    reportSubmitError: "Gagal mengirim laporan",
    reportVerifyError: "Gagal memverifikasi laporan",
    collectionCreateError: "Gagal membuat koleksi",
    collectionUpdateError: "Gagal memperbarui koleksi",
    collectionDeleteError: "Gagal menghapus koleksi",
    profileUpdateError: "Gagal memperbarui profil",
    passwordChangeError: "Gagal mengubah kata sandi",
    guestbookSubmitError: "Gagal mengirim pesan buku tamu",
    folderCreateError: "Gagal membuat folder",
    folderUpdateError: "Gagal memperbarui folder",
    folderDeleteError: "Gagal menghapus folder",
    userCreateError: "Gagal membuat pengguna",
    userUpdateError: "Gagal memperbarui pengguna",
    userDeleteError: "Gagal menghapus pengguna",
    logoutError: "Gagal logout",
    fileTypeError: "Jenis berkas tidak didukung",
    fileSizeError: "Ukuran berkas terlalu besar",
    timeoutError: "Permintaan habis waktu",
  },
  info: {
    default: "Informasi",
    processing: "Sedang memproses",
    loading: "Sedang memuat",
    uploading: "Sedang mengunggah",
    downloading: "Sedang mengunduh",
    redirecting: "Mengalihkan halaman",
    waitingApproval: "Menunggu persetujuan",
    sessionExpiring: "Sesi Anda akan segera berakhir",
    maintenanceScheduled: "Pemeliharaan terjadwal",
    newFeature: "Fitur baru tersedia",
    updateAvailable: "Pembaruan tersedia",
  },
  warning: {
    default: "Peringatan",
    unsavedChanges: "Perubahan belum disimpan",
    sessionExpired: "Sesi Anda telah berakhir",
    weakPassword: "Kata sandi terlalu lemah",
    limitReached: "Batas telah tercapai",
    dataOutdated: "Data sudah tidak mutakhir",
    browserOutdated: "Browser Anda sudah tidak mutakhir",
    connectionUnstable: "Koneksi tidak stabil",
    maintenanceSoon: "Pemeliharaan akan segera dilakukan",
    accountInactive: "Akun Anda tidak aktif",
    storageAlmostFull: "Penyimpanan hampir penuh",
  },
}

// Function to get toast message
export function getToastMessage(category: keyof typeof messages, key: string, values?: Record<string, string>): string {
  const messageCategory = messages[category]
  let message = messageCategory[key] || messageCategory.default

  // Replace placeholders with values if provided
  if (values) {
    Object.entries(values).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, value)
    })
  }

  return message
}
