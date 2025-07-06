/*
  Warnings:

  - You are about to drop the `_LoteToProduto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `produtoId` to the `Lote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_LoteToProduto_B_index";

-- DropIndex
DROP INDEX "_LoteToProduto_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LoteToProduto";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lote" (
    "idLote" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "dataEntrada" DATETIME NOT NULL,
    "dataValidade" DATETIME NOT NULL,
    "qtdRecebida" INTEGER NOT NULL,
    "localArmazenamento" TEXT,
    CONSTRAINT "Lote_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("idItem") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lote_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lote" ("dataEntrada", "dataValidade", "idLote", "itemId", "localArmazenamento", "numero", "qtdRecebida") SELECT "dataEntrada", "dataValidade", "idLote", "itemId", "localArmazenamento", "numero", "qtdRecebida" FROM "Lote";
DROP TABLE "Lote";
ALTER TABLE "new_Lote" RENAME TO "Lote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
