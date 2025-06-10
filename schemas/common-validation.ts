import { z } from 'zod'

// Common field validations
export const nameSchema = z.string().min(2, 'Nama harus minimal 2 karakter').max(100, 'Nama terlalu panjang')
export const emailSchema = z.string().email('Format email tidak valid').optional().or(z.literal(''))
export const phoneSchema = z.string().min(10, 'Nomor telepon minimal 10 digit').max(15, 'Nomor telepon terlalu panjang')
export const usernameSchema = z.string().min(3, 'Username minimal 3 karakter').max(50, 'Username terlalu panjang')

// Training types (consistent across all forms)
export const trainingTypes = ['PKN', 'PKA', 'PKP', 'LATSAR CPNS'] as const
export const trainingSchema = z.enum(trainingTypes, {
  errorMap: () => ({ message: 'Pilih jenis pelatihan yang valid' })
})

// Membership types for guestbook
export const membershipTypes = [
  'Pegawai Pusjar',
  'Peserta PKA',
  'Peserta PKP',
  'Peserta PKN',
  'Peserta Latsar CPNS',
  'Tamu'
] as const
export const membershipSchema = z.enum(membershipTypes, {
  errorMap: () => ({ message: 'Pilih jenis keanggotaan yang valid' })
})

// Visit purpose types
export const visitPurposeTypes = [
  'Mencari referensi laporan',
  'Berkunjung',
  'lainnya'
] as const
export const visitPurposeSchema = z.enum(visitPurposeTypes, {
  errorMap: () => ({ message: 'Pilih tujuan kunjungan yang valid' })
})

// Report categories (consistent with training types)
export const reportCategories = ['PKN', 'PKP', 'PKA', 'Latsar CPNS'] as const
export const reportCategorySchema = z.enum(reportCategories, {
  errorMap: () => ({ message: 'Pilih kategori laporan yang valid' })
})

// Year validation (from 2019 onwards)
export const yearSchema = z.string()
  .min(4, 'Tahun harus 4 digit')
  .regex(/^\d{4}$/, 'Format tahun tidak valid')
  .refine((year) => {
    const yearNum = parseInt(year)
    return yearNum >= 2019 && yearNum <= new Date().getFullYear() + 1
  }, 'Tahun harus antara 2019 sampai tahun depan')

// Batch validation (Roman numerals)
export const batchSchema = z.string().min(1, 'Pilih angkatan yang valid')

// Text content validation
export const titleSchema = z.string().min(3, 'Judul minimal 3 karakter').max(200, 'Judul terlalu panjang')
export const descriptionSchema = z.string().min(10, 'Deskripsi minimal 10 karakter').max(1000, 'Deskripsi terlalu panjang')
export const abstractSchema = z.string().min(50, 'Abstrak minimal 50 karakter').max(2000, 'Abstrak terlalu panjang')
export const messageSchema = z.string().min(1, 'Pesan tidak boleh kosong').max(1000, 'Pesan terlalu panjang')

// Password validation
export const passwordSchema = z.string()
  .min(8, 'Password minimal 8 karakter')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password harus mengandung huruf besar, huruf kecil, dan angka')

// File validation helpers
export const createFileSchema = (
  acceptedTypes: string[],
  maxSize: number,
  required: boolean = true
) => {
  const schema = z.any()
  if (required) {
    return schema.refine(
      (file) => file && file instanceof File,
      'File wajib dipilih'
    ).refine(
      (file) => file && acceptedTypes.includes(file.type),
      `Hanya file ${acceptedTypes.join(', ')} yang diizinkan`
    ).refine(
      (file) => file && file.size <= maxSize,
      `Ukuran file maksimal ${(maxSize / 1024 / 1024).toFixed(1)}MB`
    )
  }
  return schema.optional()
}

// Common file types
export const imageFileSchema = (required: boolean = true) =>
  createFileSchema(['image/jpeg', 'image/png', 'image/jpg'], 5 * 1024 * 1024, required)

export const pdfFileSchema = (required: boolean = true) =>
  createFileSchema(['application/pdf'], 20 * 1024 * 1024, required)

// Combined schemas for different forms
export const guestbookValidationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
  institution: z.string().min(2, 'Asal instansi minimal 2 karakter'),
  membership: membershipSchema,
  visitPurpose: visitPurposeSchema,
  otherPurpose: z.string().optional(),
})

export const registrationValidationSchema = z.object({
  username: usernameSchema,
  email: z.string().email('Format email tidak valid'),
  password: passwordSchema,
  confirmPassword: z.string(),
  training: trainingSchema,
  angkatan: batchSchema,
  phone: phoneSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak sama",
  path: ["confirmPassword"],
})

export const reportSubmissionValidationSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.optional(),
  abstract: abstractSchema.optional(),
  category: reportCategorySchema,
  year: yearSchema,
  batch: batchSchema,
  coverImage: imageFileSchema(false), // Optional
  reportFile: pdfFileSchema(true), // Required
})

// Export types for TypeScript
export type GuestbookFormData = z.infer<typeof guestbookValidationSchema>
export type RegistrationFormData = z.infer<typeof registrationValidationSchema>
export type ReportSubmissionFormData = z.infer<typeof reportSubmissionValidationSchema>

// Utility function to get error message from validation result
export function getValidationError(result: z.SafeParseReturnType<any, any>): string | null {
  if (!result.success) {
    return result.error.errors[0]?.message || 'Validation error'
  }
  return null
} 
