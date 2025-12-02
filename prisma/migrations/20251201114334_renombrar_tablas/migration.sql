/*
  Warnings:

  - You are about to drop the `Bien` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Grupo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Marca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Modelo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Responsable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subclase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ubicacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnidadMedida` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_claseId_fkey";

-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_marcaId_fkey";

-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_modeloId_fkey";

-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_responsableId_fkey";

-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_subclaseId_fkey";

-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_ubicacionId_fkey";

-- DropForeignKey
ALTER TABLE "Bien" DROP CONSTRAINT "Bien_unidadMedidaId_fkey";

-- DropForeignKey
ALTER TABLE "Clase" DROP CONSTRAINT "Clase_grupoId_fkey";

-- DropForeignKey
ALTER TABLE "Modelo" DROP CONSTRAINT "Modelo_marcaId_fkey";

-- DropForeignKey
ALTER TABLE "Subclase" DROP CONSTRAINT "Subclase_claseId_fkey";

-- DropForeignKey
ALTER TABLE "Subclase" DROP CONSTRAINT "Subclase_grupoId_fkey";

-- DropTable
DROP TABLE "Bien";

-- DropTable
DROP TABLE "Clase";

-- DropTable
DROP TABLE "Grupo";

-- DropTable
DROP TABLE "Marca";

-- DropTable
DROP TABLE "Modelo";

-- DropTable
DROP TABLE "Responsable";

-- DropTable
DROP TABLE "Subclase";

-- DropTable
DROP TABLE "Ubicacion";

-- DropTable
DROP TABLE "UnidadMedida";

-- CreateTable
CREATE TABLE "bienes" (
    "id" SERIAL NOT NULL,
    "codigoInventario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcionLarga" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "costoAdquisicion" DOUBLE PRECISION NOT NULL,
    "valorResidual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "condicion" TEXT NOT NULL DEFAULT 'Alta',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "fechaResolucion" TIMESTAMP(3),
    "nroResolucion" TEXT,
    "ultimaDepreciacion" TIMESTAMP(3),
    "tipoObjeto" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "numSerie" TEXT,
    "color" TEXT NOT NULL,
    "cantidadPieza" INTEGER,
    "largo" DOUBLE PRECISION,
    "alto" DOUBLE PRECISION,
    "ancho" DOUBLE PRECISION,
    "isla" TEXT,
    "fila" TEXT,
    "columna" TEXT,
    "grupoId" INTEGER,
    "claseId" INTEGER,
    "subclaseId" INTEGER,
    "marcaId" INTEGER,
    "modeloId" INTEGER,
    "ubicacionId" INTEGER,
    "unidadMedidaId" INTEGER,
    "responsableId" INTEGER,

    CONSTRAINT "bienes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "vidaUtil" INTEGER NOT NULL,

    CONSTRAINT "grupos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clases" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "grupoId" INTEGER NOT NULL,

    CONSTRAINT "clases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subclases" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "claseId" INTEGER NOT NULL,
    "grupoId" INTEGER NOT NULL,

    CONSTRAINT "subclases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marcas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "marcas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "marcaId" INTEGER NOT NULL,

    CONSTRAINT "modelos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ubicaciones" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "ubicaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidad_medidas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "unidad_medidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsables" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo',

    CONSTRAINT "responsables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bienes_codigoInventario_key" ON "bienes"("codigoInventario");

-- CreateIndex
CREATE INDEX "bienes_nombre_idx" ON "bienes"("nombre");

-- CreateIndex
CREATE INDEX "bienes_codigoInventario_idx" ON "bienes"("codigoInventario");

-- CreateIndex
CREATE UNIQUE INDEX "grupos_nombre_key" ON "grupos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "clases_nombre_key" ON "clases"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "subclases_nombre_key" ON "subclases"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "marcas_nombre_key" ON "marcas"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "modelos_nombre_key" ON "modelos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ubicaciones_nombre_key" ON "ubicaciones"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "unidad_medidas_nombre_key" ON "unidad_medidas"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "responsables_rut_key" ON "responsables"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "responsables_nombre_key" ON "responsables"("nombre");

-- AddForeignKey
ALTER TABLE "bienes" ADD CONSTRAINT "bienes_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bienes" ADD CONSTRAINT "bienes_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "clases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bienes" ADD CONSTRAINT "bienes_subclaseId_fkey" FOREIGN KEY ("subclaseId") REFERENCES "subclases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bienes" ADD CONSTRAINT "bienes_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marcas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bienes" ADD CONSTRAINT "bienes_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "modelos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bienes" ADD CONSTRAINT "bienes_ubicacionId_fkey" FOREIGN KEY ("ubicacionId") REFERENCES "ubicaciones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bienes" ADD CONSTRAINT "bienes_unidadMedidaId_fkey" FOREIGN KEY ("unidadMedidaId") REFERENCES "unidad_medidas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bienes" ADD CONSTRAINT "bienes_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "responsables"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clases" ADD CONSTRAINT "clases_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subclases" ADD CONSTRAINT "subclases_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "clases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subclases" ADD CONSTRAINT "subclases_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelos" ADD CONSTRAINT "modelos_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
