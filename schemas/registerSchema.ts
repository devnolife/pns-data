import * as z from "zod"

export const registerSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username harus minimal 3 karakter.",
    }),
    training: z.string({
      required_error: "Silakan pilih program pelatihan.",
    }),
    angkatan: z.string().min(1, {
      message: "Angkatan wajib diisi.",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Nomor telepon harus minimal 10 digit.",
      })
      .regex(/^\d+$/, {
        message: "Nomor telepon hanya boleh berisi angka.",
      }),
    email: z.string().email({
      message: "Silakan masukkan alamat email yang valid.",
    }),
    password: z.string().min(8, {
      message: "Kata sandi harus minimal 8 karakter.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
