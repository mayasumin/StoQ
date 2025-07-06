/*
  Warnings:

  - You are about to drop the `PoliticaSaida` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `observacoes` on the `Lote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN "observacoes" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PoliticaSaida";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Configuracao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "politicaSaida" TEXT NOT NULL DEFAULT 'PVPS'
);

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
    CONSTRAINT "Lote_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("idItem") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lote" ("dataEntrada", "dataValidade", "idLote", "itemId", "localArmazenamento", "numero", "qtdRecebida") SELECT "dataEntrada", "dataValidade", "idLote", "itemId", "localArmazenamento", "numero", "qtdRecebida" FROM "Lote";
DROP TABLE "Lote";
ALTER TABLE "new_Lote" RENAME TO "Lote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
