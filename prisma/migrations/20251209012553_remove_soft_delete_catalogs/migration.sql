/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `clases` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `grupos` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `marcas` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `modelos` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `responsables` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `subclases` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ubicaciones` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `unidad_medidas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clases" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "grupos" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "marcas" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "modelos" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "responsables" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "subclases" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "ubicaciones" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "unidad_medidas" DROP COLUMN "isDeleted";
