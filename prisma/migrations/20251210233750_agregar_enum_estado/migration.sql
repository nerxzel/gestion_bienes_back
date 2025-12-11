/*
  Warnings:

  - Changed the type of `estado` on the `bienes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EstadoBien" AS ENUM ('Bueno', 'Regular', 'Malo');

-- AlterTable
ALTER TABLE "bienes" ALTER COLUMN "condicion" SET DEFAULT 'Pendiente',
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoBien" NOT NULL;
