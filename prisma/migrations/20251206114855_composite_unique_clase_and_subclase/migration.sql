/*
  Warnings:

  - A unique constraint covering the columns `[nombre,grupoId]` on the table `clases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre,claseId]` on the table `subclases` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "clases_nombre_key";

-- DropIndex
DROP INDEX "subclases_nombre_key";

-- CreateIndex
CREATE UNIQUE INDEX "clases_nombre_grupoId_key" ON "clases"("nombre", "grupoId");

-- CreateIndex
CREATE UNIQUE INDEX "subclases_nombre_claseId_key" ON "subclases"("nombre", "claseId");
