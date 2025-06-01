import { PrismaClient } from './generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a new client with error handling
const createPrismaClient = () => {
  return new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty',
  })
}

// If we're not in production, try to reuse the client
export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 
