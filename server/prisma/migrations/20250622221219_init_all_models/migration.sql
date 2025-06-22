/*
  Warnings:

  - The primary key for the `Produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Produto` table. All the data in the column will be lost.
  - The required column `idProduto` was added to the `Produto` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateTable
CREATE TABLE "Fornecedor" (
    "idFornecedor" TEXT NOT NULL PRIMARY KEY,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NotaFiscal" (
    "idNF" TEXT NOT NULL PRIMARY KEY,
    "fornecedorId" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "dataEmissao" DATETIME NOT NULL,
    CONSTRAINT "NotaFiscal_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor" ("idFornecedor") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "idItem" TEXT NOT NULL PRIMARY KEY,
    "notafiscalId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "qntdRecebida" INTEGER NOT NULL,
    "ncm" TEXT NOT NULL,
    "cfop" TEXT NOT NULL,
    "precoUnit" REAL NOT NULL,
    CONSTRAINT "Item_notafiscalId_fkey" FOREIGN KEY ("notafiscalId") REFERENCES "NotaFiscal" ("idNF") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lote" (
    "idLote" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "dataEntrada" DATETIME NOT NULL,
    "dataValidade" DATETIME NOT NULL,
    "qtd" INTEGER NOT NULL,
    CONSTRAINT "Lote_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("idItem") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "idMovimentacao" TEXT NOT NULL PRIMARY KEY,
    "produtoId" TEXT NOT NULL,
    "loteId" TEXT NOT NULL,
    "qnt" INTEGER NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "responsavel" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    CONSTRAINT "Movimentacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movimentacao_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("idLote") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PoliticaSaida" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AlertaEstoque" (
    "idAlertaEstoque" TEXT NOT NULL PRIMARY KEY,
    "produtoId" TEXT NOT NULL,
    "qntAtual" TEXT NOT NULL,
    "qntMin" TEXT NOT NULL,
    CONSTRAINT "AlertaEstoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AlertaValidade" (
    "idAlertaValidade" TEXT NOT NULL PRIMARY KEY,
    "loteId" TEXT NOT NULL,
    "qntAtual" INTEGER NOT NULL,
    "dataValidade" DATETIME NOT NULL,
    CONSTRAINT "AlertaValidade_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("idLote") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "idProduto" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "unMedida" TEXT NOT NULL,
    "qntMin" INTEGER NOT NULL,
    "qntEstoque" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL
);
INSERT INTO "new_Produto" ("descricao", "nome", "qntEstoque", "qntMin", "status", "unMedida") SELECT "descricao", "nome", "qntEstoque", "qntMin", "status", "unMedida" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
