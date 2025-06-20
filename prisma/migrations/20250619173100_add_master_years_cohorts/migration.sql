-- CreateEnum
CREATE TYPE "CohortStatus" AS ENUM ('PLANNING', 'REGISTRATION', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'GRADUATED', 'DROPPED');

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "cover_image_url" TEXT;

-- AlterTable
ALTER TABLE "uploaded_files" ADD COLUMN     "file_type" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "training_program_id" TEXT;

-- CreateTable
CREATE TABLE "report_folders" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "report_type" TEXT NOT NULL,
    "description" TEXT,
    "created_by" TEXT NOT NULL,
    "training_program_id" TEXT,
    "cohort_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "description" TEXT,
    "duration_days" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_cohorts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "training_program_id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "max_participants" INTEGER,
    "current_participants" INTEGER NOT NULL DEFAULT 0,
    "status" "CohortStatus" NOT NULL DEFAULT 'PLANNING',
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_cohorts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cohort_members" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "cohort_id" TEXT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MemberStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,

    CONSTRAINT "cohort_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_years" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_cohorts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_cohorts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "report_folders_year_idx" ON "report_folders"("year");

-- CreateIndex
CREATE INDEX "report_folders_batch_idx" ON "report_folders"("batch");

-- CreateIndex
CREATE INDEX "report_folders_report_type_idx" ON "report_folders"("report_type");

-- CreateIndex
CREATE UNIQUE INDEX "report_folders_year_batch_report_type_key" ON "report_folders"("year", "batch", "report_type");

-- CreateIndex
CREATE UNIQUE INDEX "training_programs_name_key" ON "training_programs"("name");

-- CreateIndex
CREATE INDEX "training_cohorts_year_idx" ON "training_cohorts"("year");

-- CreateIndex
CREATE UNIQUE INDEX "training_cohorts_training_program_id_name_year_key" ON "training_cohorts"("training_program_id", "name", "year");

-- CreateIndex
CREATE INDEX "cohort_members_cohort_id_idx" ON "cohort_members"("cohort_id");

-- CreateIndex
CREATE UNIQUE INDEX "cohort_members_user_id_cohort_id_key" ON "cohort_members"("user_id", "cohort_id");

-- CreateIndex
CREATE UNIQUE INDEX "master_years_year_key" ON "master_years"("year");

-- CreateIndex
CREATE INDEX "master_years_year_idx" ON "master_years"("year");

-- CreateIndex
CREATE UNIQUE INDEX "master_cohorts_name_key" ON "master_cohorts"("name");

-- CreateIndex
CREATE INDEX "master_cohorts_name_idx" ON "master_cohorts"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_training_program_id_fkey" FOREIGN KEY ("training_program_id") REFERENCES "training_programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_folders" ADD CONSTRAINT "report_folders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_folders" ADD CONSTRAINT "report_folders_training_program_id_fkey" FOREIGN KEY ("training_program_id") REFERENCES "training_programs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_folders" ADD CONSTRAINT "report_folders_cohort_id_fkey" FOREIGN KEY ("cohort_id") REFERENCES "training_cohorts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_cohorts" ADD CONSTRAINT "training_cohorts_training_program_id_fkey" FOREIGN KEY ("training_program_id") REFERENCES "training_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cohort_members" ADD CONSTRAINT "cohort_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cohort_members" ADD CONSTRAINT "cohort_members_cohort_id_fkey" FOREIGN KEY ("cohort_id") REFERENCES "training_cohorts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
