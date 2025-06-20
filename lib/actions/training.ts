"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/actions/auth"
import { revalidatePath } from "next/cache"

// Types
export interface TrainingProgramData {
  id: string
  name: string
  full_name: string
  description?: string
  duration_days?: number
  is_active: boolean
  created_at: Date
  updated_at: Date
  _count: {
    cohorts: number
    users: number
  }
}

export interface TrainingCohortData {
  id: string
  name: string
  training_program_id: string
  year: string
  start_date?: Date
  end_date?: Date
  max_participants?: number
  current_participants: number
  status: string
  description?: string
  is_active: boolean
  created_at: Date
  updated_at: Date
  training_program: {
    name: string
    full_name: string
  }
  _count: {
    members: number
    folders: number
  }
}

export interface CohortMemberData {
  id: string
  user_id: string
  cohort_id: string
  joined_at: Date
  status: string
  notes?: string
  user: {
    name?: string
    username: string
    email: string
    training?: string
    angkatan?: string
  }
}

// =============== TRAINING PROGRAMS ===============

export async function getTrainingProgramsAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    const programs = await prisma.training_programs.findMany({
      include: {
        _count: {
          select: {
            cohorts: true,
            users: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return { success: true, data: programs }
  } catch (error) {
    console.error("Error fetching training programs:", error)
    return { success: false, error: "Gagal memuat program pelatihan" }
  }
}

export async function createTrainingProgramAction(data: {
  name: string
  full_name: string
  description?: string
  duration_days?: number
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    // Check if program already exists
    const existing = await prisma.training_programs.findUnique({
      where: { name: data.name }
    })

    if (existing) {
      return { success: false, error: "Program pelatihan dengan nama ini sudah ada" }
    }

    const program = await prisma.training_programs.create({
      data: {
        name: data.name,
        full_name: data.full_name,
        description: data.description,
        duration_days: data.duration_days,
      }
    })

    revalidatePath('/dashboard/admin')
    return {
      success: true,
      message: `Program pelatihan ${data.name} berhasil dibuat!`,
      data: program
    }
  } catch (error) {
    console.error("Error creating training program:", error)
    return { success: false, error: "Gagal membuat program pelatihan" }
  }
}

export async function updateTrainingProgramAction(data: {
  id: string
  full_name: string
  description?: string
  duration_days?: number
  is_active: boolean
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    const program = await prisma.training_programs.update({
      where: { id: data.id },
      data: {
        full_name: data.full_name,
        description: data.description,
        duration_days: data.duration_days,
        is_active: data.is_active,
      }
    })

    revalidatePath('/dashboard/admin')
    return {
      success: true,
      message: `Program pelatihan ${program.name} berhasil diperbarui!`,
      data: program
    }
  } catch (error) {
    console.error("Error updating training program:", error)
    return { success: false, error: "Gagal memperbarui program pelatihan" }
  }
}

// =============== TRAINING COHORTS ===============

export async function getTrainingCohortsAction(programId?: string, year?: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    const whereClause: any = {}
    if (programId) whereClause.training_program_id = programId
    if (year) whereClause.year = year

    const cohorts = await prisma.training_cohorts.findMany({
      where: whereClause,
      include: {
        training_program: {
          select: {
            name: true,
            full_name: true
          }
        },
        _count: {
          select: {
            members: true,
            folders: true
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { training_program_id: 'asc' },
        { name: 'asc' }
      ]
    })

    return { success: true, data: cohorts }
  } catch (error) {
    console.error("Error fetching training cohorts:", error)
    return { success: false, error: "Gagal memuat angkatan pelatihan" }
  }
}

export async function createTrainingCohortAction(data: {
  name: string
  training_program_id: string
  year: string
  start_date?: Date
  end_date?: Date
  max_participants?: number
  description?: string
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    // Check if cohort already exists
    const existing = await prisma.training_cohorts.findUnique({
      where: {
        training_program_id_name_year: {
          training_program_id: data.training_program_id,
          name: data.name,
          year: data.year
        }
      }
    })

    if (existing) {
      return { success: false, error: "Angkatan dengan nama dan tahun ini sudah ada" }
    }

    const cohort = await prisma.training_cohorts.create({
      data: {
        name: data.name,
        training_program_id: data.training_program_id,
        year: data.year,
        start_date: data.start_date,
        end_date: data.end_date,
        max_participants: data.max_participants,
        description: data.description,
      },
      include: {
        training_program: {
          select: {
            name: true,
            full_name: true
          }
        }
      }
    })

    revalidatePath('/dashboard/admin')
    return {
      success: true,
      message: `Angkatan ${data.name} ${cohort.training_program.name} ${data.year} berhasil dibuat!`,
      data: cohort
    }
  } catch (error) {
    console.error("Error creating training cohort:", error)
    return { success: false, error: "Gagal membuat angkatan pelatihan" }
  }
}

export async function updateTrainingCohortAction(data: {
  id: string
  start_date?: Date
  end_date?: Date
  max_participants?: number
  status: string
  description?: string
  is_active: boolean
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    const cohort = await prisma.training_cohorts.update({
      where: { id: data.id },
      data: {
        start_date: data.start_date,
        end_date: data.end_date,
        max_participants: data.max_participants,
        status: data.status as any,
        description: data.description,
        is_active: data.is_active,
      },
      include: {
        training_program: {
          select: {
            name: true,
            full_name: true
          }
        }
      }
    })

    revalidatePath('/dashboard/admin')
    return {
      success: true,
      message: `Angkatan ${cohort.name} ${cohort.training_program.name} berhasil diperbarui!`,
      data: cohort
    }
  } catch (error) {
    console.error("Error updating training cohort:", error)
    return { success: false, error: "Gagal memperbarui angkatan pelatihan" }
  }
}

// =============== COHORT MEMBERS ===============

export async function getCohortMembersAction(cohortId: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    const members = await prisma.cohort_members.findMany({
      where: { cohort_id: cohortId },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            email: true,
            training: true,
            angkatan: true
          }
        }
      },
      orderBy: {
        joined_at: 'desc'
      }
    })

    return { success: true, data: members }
  } catch (error) {
    console.error("Error fetching cohort members:", error)
    return { success: false, error: "Gagal memuat anggota angkatan" }
  }
}

export async function addCohortMemberAction(data: {
  user_id: string
  cohort_id: string
  notes?: string
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    // Check if member already exists
    const existing = await prisma.cohort_members.findUnique({
      where: {
        user_id_cohort_id: {
          user_id: data.user_id,
          cohort_id: data.cohort_id
        }
      }
    })

    if (existing) {
      return { success: false, error: "User sudah menjadi anggota angkatan ini" }
    }

    const member = await prisma.cohort_members.create({
      data: {
        user_id: data.user_id,
        cohort_id: data.cohort_id,
        notes: data.notes,
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            email: true
          }
        }
      }
    })

    // Update current_participants count
    await prisma.training_cohorts.update({
      where: { id: data.cohort_id },
      data: {
        current_participants: {
          increment: 1
        }
      }
    })

    revalidatePath('/dashboard/admin')
    return {
      success: true,
      message: `${member.user.name || member.user.username} berhasil ditambahkan ke angkatan!`,
      data: member
    }
  } catch (error) {
    console.error("Error adding cohort member:", error)
    return { success: false, error: "Gagal menambahkan anggota angkatan" }
  }
}

export async function updateCohortMemberStatusAction(data: {
  id: string
  status: string
  notes?: string
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    const member = await prisma.cohort_members.update({
      where: { id: data.id },
      data: {
        status: data.status as any,
        notes: data.notes,
      },
      include: {
        user: {
          select: {
            name: true,
            username: true
          }
        }
      }
    })

    revalidatePath('/dashboard/admin')
    return {
      success: true,
      message: `Status ${member.user.name || member.user.username} berhasil diperbarui!`,
      data: member
    }
  } catch (error) {
    console.error("Error updating member status:", error)
    return { success: false, error: "Gagal memperbarui status anggota" }
  }
}

export async function removeCohortMemberAction(memberId: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    const member = await prisma.cohort_members.findUnique({
      where: { id: memberId },
      include: {
        user: {
          select: {
            name: true,
            username: true
          }
        }
      }
    })

    if (!member) {
      return { success: false, error: "Anggota tidak ditemukan" }
    }

    await prisma.cohort_members.delete({
      where: { id: memberId }
    })

    // Update current_participants count
    await prisma.training_cohorts.update({
      where: { id: member.cohort_id },
      data: {
        current_participants: {
          decrement: 1
        }
      }
    })

    revalidatePath('/dashboard/admin')
    return {
      success: true,
      message: `${member.user.name || member.user.username} berhasil dihapus dari angkatan!`
    }
  } catch (error) {
    console.error("Error removing cohort member:", error)
    return { success: false, error: "Gagal menghapus anggota angkatan" }
  }
}

// =============== STATISTICS ===============

export async function getTrainingStatsAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: "Akses ditolak" }
    }

    const [
      totalPrograms,
      activePrograms,
      totalCohorts,
      activeCohorts,
      totalMembers,
      activeMembers,
      programStats,
      cohortsByYear
    ] = await Promise.all([
      prisma.training_programs.count(),
      prisma.training_programs.count({ where: { is_active: true } }),
      prisma.training_cohorts.count(),
      prisma.training_cohorts.count({ where: { is_active: true } }),
      prisma.cohort_members.count(),
      prisma.cohort_members.count({ where: { status: 'ACTIVE' } }),
      prisma.training_programs.findMany({
        include: {
          _count: {
            select: {
              cohorts: true,
              users: true
            }
          }
        }
      }),
      prisma.training_cohorts.groupBy({
        by: ['year'],
        _count: {
          id: true
        },
        orderBy: {
          year: 'desc'
        }
      })
    ])

    const stats = {
      totalPrograms,
      activePrograms,
      totalCohorts,
      activeCohorts,
      totalMembers,
      activeMembers,
      programStats,
      cohortsByYear
    }

    return { success: true, data: stats }
  } catch (error) {
    console.error("Error fetching training stats:", error)
    return { success: false, error: "Gagal memuat statistik pelatihan" }
  }
}

// Master Years Management
export async function getMasterYearsAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    const years = await prisma.master_years.findMany({
      orderBy: { year: 'desc' }
    })

    return { success: true, data: years }
  } catch (error) {
    console.error('Error fetching master years:', error)
    return { success: false, error: 'Failed to fetch master years' }
  }
}

export async function createMasterYearAction(year: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    // Validate year
    const yearNum = parseInt(year)
    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2050) {
      return { success: false, error: 'Invalid year' }
    }

    const newYear = await prisma.master_years.create({
      data: {
        year,
        is_active: true,
      }
    })

    return { success: true, data: newYear }
  } catch (error: any) {
    console.error('Error creating master year:', error)
    if (error.code === 'P2002') {
      return { success: false, error: 'Tahun sudah ada' }
    }
    return { success: false, error: 'Failed to create master year' }
  }
}

export async function deleteMasterYearAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.master_years.delete({
      where: { id }
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting master year:', error)
    return { success: false, error: 'Failed to delete master year' }
  }
}

// Master Cohorts Management
export async function getMasterCohortsAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    const cohorts = await prisma.master_cohorts.findMany({
      orderBy: { name: 'asc' }
    })

    return { success: true, data: cohorts }
  } catch (error) {
    console.error('Error fetching master cohorts:', error)
    return { success: false, error: 'Failed to fetch master cohorts' }
  }
}

export async function createMasterCohortAction(name: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    // Validate cohort name
    if (!name || name.trim().length === 0) {
      return { success: false, error: 'Nama angkatan tidak boleh kosong' }
    }

    const newCohort = await prisma.master_cohorts.create({
      data: {
        name: name.trim().toUpperCase(),
        is_active: true,
      }
    })

    return { success: true, data: newCohort }
  } catch (error: any) {
    console.error('Error creating master cohort:', error)
    if (error.code === 'P2002') {
      return { success: false, error: 'Nama angkatan sudah ada' }
    }
    return { success: false, error: 'Failed to create master cohort' }
  }
}

export async function deleteMasterCohortAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.master_cohorts.delete({
      where: { id }
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting master cohort:', error)
    return { success: false, error: 'Failed to delete master cohort' }
  }
} 
