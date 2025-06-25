/*
  Warnings:

  - You are about to drop the column `qtd` on the `Lote` table. All the data in the column will be lost.
  - You are about to drop the column `qnt` on the `Movimentacao` table. All the data in the column will be lost.
  - Added the required column `produtoId` to the `Lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtdRecebida` to the `Lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qntRetirada` to the `Movimentacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qntEstoque` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qntMin` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "idItem" TEXT NOT NULL PRIMARY KEY,
    "notafiscalId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "qntdRecebida" INTEGER NOT NULL,
    "ncm" TEXT,
    "cfop" TEXT,
    "precoUnit" REAL NOT NULL,
    CONSTRAINT "Item_notafiscalId_fkey" FOREIGN KEY ("notafiscalId") REFERENCES "NotaFiscal" ("idNF") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("cfop", "idItem", "ncm", "notafiscalId", "precoUnit", "produtoId", "qntdRecebida") SELECT "cfop", "idItem", "ncm", "notafiscalId", "precoUnit", "produtoId", "qntdRecebida" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Lote" (
    "idLote" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "dataEntrada" DATETIME NOT NULL,
    "dataValidade" DATETIME NOT NULL,
    "qtdRecebida" INTEGER NOT NULL,
    "localArmazenamento" TEXT,
    "observacoes" TEXT,
    CONSTRAINT "Lote_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("idItem") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lote_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lote" ("dataEntrada", "dataValidade", "idLote", "itemId", "numero") SELECT "dataEntrada", "dataValidade", "idLote", "itemId", "numero" FROM "Lote";
DROP TABLE "Lote";
ALTER TABLE "new_Lote" RENAME TO "Lote";
CREATE TABLE "new_Movimentacao" (
    "idMovimentacao" TEXT NOT NULL PRIMARY KEY,
    "produtoId" TEXT NOT NULL,
    "loteId" TEXT NOT NULL,
    "qntRetirada" INTEGER NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "responsavel" TEXT NOT NULL,
    "observacoes" TEXT,
    CONSTRAINT "Movimentacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movimentacao_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("idLote") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movimentacao" ("dataHora", "idMovimentacao", "loteId", "observacoes", "produtoId", "responsavel") SELECT "dataHora", "idMovimentacao", "loteId", "observacoes", "produtoId", "responsavel" FROM "Movimentacao";
DROP TABLE "Movimentacao";
ALTER TABLE "new_Movimentacao" RENAME TO "Movimentacao";
CREATE TABLE "new_Produto" (
    "idProduto" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "unMedida" TEXT,
    "qntMin" INTEGER NOT NULL,
    "qntEstoque" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL
);
INSERT INTO "new_Produto" ("descricao", "idProduto", "nome", "unMedida") SELECT "descricao", "idProduto", "nome", "unMedida" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
