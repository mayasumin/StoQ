/*
  Warnings:

  - You are about to drop the column `qntEstoque` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `qntMin` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Produto` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "idProduto" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "unMedida" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("descricao", "idProduto", "nome", "unMedida") SELECT "descricao", "idProduto", "nome", "unMedida" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
