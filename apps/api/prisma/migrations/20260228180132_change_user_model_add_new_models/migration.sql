/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "enum_user_role" AS ENUM ('TEEN', 'ADULT');

-- CreateEnum
CREATE TYPE "enum_user_mood" AS ENUM ('HAPPY', 'CALM', 'ANXIOUS', 'IRRITABLE', 'SAD', 'ENERGETIC', 'TIRED');

-- CreateEnum
CREATE TYPE "enum_flow_level" AS ENUM ('NONE', 'SPOTTING', 'LIGHT', 'MEDIUM', 'HEAVY');

-- CreateEnum
CREATE TYPE "enum_link_status" AS ENUM ('PENDING', 'ACTIVE', 'REVOKED');

-- CreateEnum
CREATE TYPE "enum_notification_type" AS ENUM ('CYCLE_STARTING_SOON', 'CYCLE_STARTED', 'MOOD_CONCERN', 'NOTE_FLAGGED');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "role" "enum_user_role" NOT NULL DEFAULT 'ADULT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cycles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "length" INTEGER,
    "is_irregular" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cycle_days" (
    "id" TEXT NOT NULL,
    "cycle_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" "enum_flow_level",
    "mood" "enum_user_mood"[],
    "symptoms" TEXT[],
    "note" TEXT,

    CONSTRAINT "cycle_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avg_cycle_days" INTEGER NOT NULL DEFAULT 28,
    "avg_period_days" INTEGER NOT NULL DEFAULT 5,
    "reminder_enabled" BOOLEAN NOT NULL DEFAULT false,
    "reminder_days_before" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parent_child_links" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "child_id" TEXT NOT NULL,
    "can_view_mood" BOOLEAN NOT NULL DEFAULT true,
    "can_view_cycles" BOOLEAN NOT NULL DEFAULT false,
    "can_view_symptoms" BOOLEAN NOT NULL DEFAULT false,
    "can_view_notes" BOOLEAN NOT NULL DEFAULT false,
    "status" "enum_link_status" NOT NULL DEFAULT 'PENDING',
    "invite_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parent_child_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parent_notifications" (
    "id" TEXT NOT NULL,
    "link_id" TEXT NOT NULL,
    "type" "enum_notification_type" NOT NULL,
    "message" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parent_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "cycle_days_cycle_id_date_idx" ON "cycle_days"("cycle_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "cycle_days_cycle_id_date_key" ON "cycle_days"("cycle_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_userId_key" ON "user_settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "parent_child_links_invite_code_key" ON "parent_child_links"("invite_code");

-- CreateIndex
CREATE UNIQUE INDEX "parent_child_links_parent_id_child_id_key" ON "parent_child_links"("parent_id", "child_id");

-- AddForeignKey
ALTER TABLE "cycles" ADD CONSTRAINT "cycles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cycle_days" ADD CONSTRAINT "cycle_days_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "cycles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_links" ADD CONSTRAINT "parent_child_links_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_child_links" ADD CONSTRAINT "parent_child_links_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_notifications" ADD CONSTRAINT "parent_notifications_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "parent_child_links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
