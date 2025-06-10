import { z } from 'zod'

export const uploadReportSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  abstract: z.string().min(1, 'Abstrak wajib diisi'),
  reportType: z.enum(['PKN', 'PKP', 'PKA', 'LATSAR']),
  year: z.string().min(4, 'Tahun wajib diisi'),
  batch: z.string().min(1, 'Angkatan wajib diisi'),
  coverImage: z.any(), // file validation opsional
  reportFile: z.any(),
})