-- CreateTable
CREATE TABLE "Bien" (
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

    CONSTRAINT "Bien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "vidaUtil" INTEGER NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clase" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "grupoId" INTEGER NOT NULL,

    CONSTRAINT "Clase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subclase" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "claseId" INTEGER NOT NULL,
    "grupoId" INTEGER NOT NULL,

    CONSTRAINT "Subclase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modelo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "marcaId" INTEGER NOT NULL,

    CONSTRAINT "Modelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnidadMedida" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "UnidadMedida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsable" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Responsable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bien_codigoInventario_key" ON "Bien"("codigoInventario");

-- CreateIndex
CREATE INDEX "Bien_nombre_idx" ON "Bien"("nombre");

-- CreateIndex
CREATE INDEX "Bien_codigoInventario_idx" ON "Bien"("codigoInventario");

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_nombre_key" ON "Grupo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Clase_nombre_key" ON "Clase"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Subclase_nombre_key" ON "Subclase"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nombre_key" ON "Marca"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Modelo_nombre_key" ON "Modelo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Ubicacion_nombre_key" ON "Ubicacion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "UnidadMedida_nombre_key" ON "UnidadMedida"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Responsable_rut_key" ON "Responsable"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Responsable_nombre_key" ON "Responsable"("nombre");

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "Clase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_subclaseId_fkey" FOREIGN KEY ("subclaseId") REFERENCES "Subclase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_ubicacionId_fkey" FOREIGN KEY ("ubicacionId") REFERENCES "Ubicacion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_unidadMedidaId_fkey" FOREIGN KEY ("unidadMedidaId") REFERENCES "UnidadMedida"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bien" ADD CONSTRAINT "Bien_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "Responsable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subclase" ADD CONSTRAINT "Subclase_claseId_fkey" FOREIGN KEY ("claseId") REFERENCES "Clase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subclase" ADD CONSTRAINT "Subclase_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modelo" ADD CONSTRAINT "Modelo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
