/*
  Warnings:

  - You are about to drop the column `contrasenha` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `name` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "contrasenha",
DROP COLUMN "nombre",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;
