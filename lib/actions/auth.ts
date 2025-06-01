'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET!

// Schemas
const loginSchema = z.object({
  username: z.string().min(1, 'Username diperlukan'),
  password: z.string().min(1, 'Kata sandi diperlukan'),
})

const registerSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Kata sandi minimal 8 karakter'),
  name: z.string().optional(),
})

const registerUserSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Kata sandi minimal 8 karakter'),
  training: z.string().min(1, 'Pelatihan diperlukan'),
  angkatan: z.string().min(1, 'Angkatan diperlukan'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 karakter').regex(/^\d+$/, 'Nomor telepon hanya boleh berisi angka'),
})

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Nama lengkap diperlukan'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 karakter').regex(/^\d+$/, 'Nomor telepon hanya boleh berisi angka'),
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Password saat ini diperlukan'),
  newPassword: z.string().min(8, 'Password baru minimal 8 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password diperlukan'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Password baru tidak cocok",
  path: ["confirmPassword"],
})

export async function loginAction(formData: FormData) {
  try {
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }

    const validatedData = loginSchema.parse(data)

    // Find user using Prisma client method
    const user = await prisma.users.findUnique({
      where: { username: validatedData.username }
    })

    if (!user) {
      return { error: 'Username atau kata sandi tidak valid' }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(validatedData.password, user.password)

    if (!isValidPassword) {
      return { error: 'Username atau kata sandi tidak valid' }
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Set cookie with better production settings
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days to match JWT expiration
      path: '/', // Ensure cookie is available site-wide
    })

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      },
      redirectUrl: user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user"
    }
  } catch (error) {
    console.error('Login error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Login gagal' }
  }
}

// Add a new API compatible login function
export async function loginUserAction(credentials: { username: string; password: string }) {
  try {
    // Validate input
    if (!credentials.username || !credentials.password) {
      return { error: 'Username dan kata sandi diperlukan' }
    }

    // Find user using Prisma client method
    const user = await prisma.users.findUnique({
      where: { username: credentials.username }
    })

    if (!user) {
      return { error: 'Username atau kata sandi tidak valid' }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(credentials.password, user.password)

    if (!isValidPassword) {
      return { error: 'Username atau kata sandi tidak valid' }
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Login gagal' }
  }
}

export async function registerAction(formData: FormData) {
  try {
    const data = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
    }

    const validatedData = registerSchema.parse(data)

    // Check if user exists using Prisma client method
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { username: validatedData.username },
          { email: validatedData.email }
        ]
      }
    })

    if (existingUser) {
      return { error: 'Username atau email sudah terdaftar' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user using Prisma client method
    const user = await prisma.users.create({
      data: {
        id: crypto.randomUUID(),
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name || null,
        role: 'USER',
        created_at: new Date(),
        updated_at: new Date(),
      }
    })

    return { success: true, user: { id: user.id, username: user.username, role: user.role } }
  } catch (error) {
    console.error('Register error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Pendaftaran gagal' }
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('token')
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { error: 'Logout gagal' }
  } finally {
    // Always redirect to login page
    redirect('/login')
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string; role: string }

    // Use Prisma client method to get user data
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        training: true,
        angkatan: true,
        phone: true,
        created_at: true,
        updated_at: true,
      }
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      training: user.training,
      angkatan: user.angkatan,
      phone: user.phone,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

export async function registerUserAction(data: {
  username: string;
  email: string;
  password: string;
  training: string;
  angkatan: string;
  phone: string;
}) {
  try {
    // Validate the data
    const validatedData = registerUserSchema.parse(data)

    // Check if user exists using Prisma client method
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { username: validatedData.username },
          { email: validatedData.email }
        ]
      }
    })

    if (existingUser) {
      return { error: 'Username atau email sudah terdaftar' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user using Prisma client method
    const user = await prisma.users.create({
      data: {
        id: crypto.randomUUID(),
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.username, // Use username as name
        role: 'USER',
        training: validatedData.training,
        angkatan: validatedData.angkatan,
        phone: validatedData.phone,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  } catch (error) {
    console.error('Register error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Pendaftaran gagal' }
  }
}

export async function updateProfileAction(data: {
  name: string;
  email: string;
  phone: string;
}) {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Anda harus login terlebih dahulu' }
    }

    // Validate the data
    const validatedData = updateProfileSchema.parse(data)

    // Check if email is already used by another user
    const existingUser = await prisma.users.findFirst({
      where: {
        email: validatedData.email,
        NOT: {
          id: currentUser.id
        }
      }
    })

    if (existingUser) {
      return { error: 'Email sudah digunakan oleh pengguna lain' }
    }

    // Update user profile
    const updatedUser = await prisma.users.update({
      where: { id: currentUser.id },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        updated_at: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        training: true,
        angkatan: true,
        phone: true,
        created_at: true,
        updated_at: true,
      }
    })

    return {
      success: true,
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        training: updatedUser.training,
        angkatan: updatedUser.angkatan,
        phone: updatedUser.phone,
        createdAt: updatedUser.created_at,
        updatedAt: updatedUser.updated_at,
      }
    }
  } catch (error) {
    console.error('Update profile error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Gagal memperbarui profil' }
  }
}

export async function changePasswordAction(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Anda harus login terlebih dahulu' }
    }

    // Validate the data
    const validatedData = changePasswordSchema.parse(data)

    // Get user with password for verification
    const user = await prisma.users.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        password: true,
      }
    })

    if (!user) {
      return { error: 'Pengguna tidak ditemukan' }
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(validatedData.currentPassword, user.password)
    if (!isValidPassword) {
      return { error: 'Password saat ini tidak benar' }
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, 12)

    // Update password
    await prisma.users.update({
      where: { id: currentUser.id },
      data: {
        password: hashedNewPassword,
        updated_at: new Date(),
      }
    })

    return { success: true, message: 'Password berhasil diperbarui' }
  } catch (error) {
    console.error('Change password error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Gagal mengubah password' }
  }
} 
