-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "unMedida" TEXT NOT NULL,
    "qntMin" INTEGER NOT NULL,
    "qntEstoque" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL
);
