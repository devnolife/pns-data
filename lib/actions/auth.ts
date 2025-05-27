'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const JWT_SECRET = process.env.JWT_SECRET!

// Schemas
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
})

export async function loginAction(formData: FormData) {
  try {
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }

    const validatedData = loginSchema.parse(data)

    // Find user
    const user = await prisma.user.findUnique({
      where: { username: validatedData.username }
    })

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(validatedData.password, user.password)

    if (!isValidPassword) {
      return { error: 'Invalid credentials' }
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

    // Set cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, user: { id: user.id, username: user.username, role: user.role } }
  } catch (error) {
    console.error('Login error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Login failed' }
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

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: validatedData.username },
          { email: validatedData.email }
        ]
      }
    })

    if (existingUser) {
      return { error: 'Username or email already exists' }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name || null,
      }
    })

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

    // Set cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, user: { id: user.id, username: user.username, role: user.role } }
  } catch (error) {
    console.error('Register error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Registration failed' }
  }
}

export async function logoutAction() {
  cookies().delete('token')
  redirect('/login')
}

export async function getCurrentUser() {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string; role: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        createdAt: true,
      }
    })

    return user
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
} 
