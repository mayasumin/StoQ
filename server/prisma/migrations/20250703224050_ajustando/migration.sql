/*
  Warnings:

  - You are about to drop the column `produtoId` on the `Lote` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lote" (
    "idLote" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "dataEntrada" DATETIME NOT NULL,
    "dataValidade" DATETIME NOT NULL,
    "qtdRecebida" INTEGER NOT NULL,
    "localArmazenamento" TEXT,
    "observacoes" TEXT,
    CONSTRAINT "Lote_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("idItem") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lote" ("dataEntrada", "dataValidade", "idLote", "itemId", "localArmazenamento", "numero", "observacoes", "qtdRecebida") SELECT "dataEntrada", "dataValidade", "idLote", "itemId", "localArmazenamento", "numero", "observacoes", "qtdRecebida" FROM "Lote";
DROP TABLE "Lote";
ALTER TABLE "new_Lote" RENAME TO "Lote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
