/*
  Warnings:

  - A unique constraint covering the columns `[nombre,marcaId]` on the table `modelos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "modelos_nombre_marcaId_key" ON "modelos"("nombre", "marcaId");
