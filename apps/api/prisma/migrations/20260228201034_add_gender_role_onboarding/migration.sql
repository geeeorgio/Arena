-- CreateEnum
CREATE TYPE "enum_gender" AS ENUM ('FEMALE', 'MALE', 'OTHER');

-- AlterEnum
ALTER TYPE "enum_user_role" ADD VALUE 'PARENT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "enum_gender",
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "role" DROP DEFAULT;
