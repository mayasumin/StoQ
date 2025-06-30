/*
  Warnings:

  - Added the required column `observacoes` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fornecedor" (
    "idFornecedor" TEXT NOT NULL PRIMARY KEY,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL
);
INSERT INTO "new_Fornecedor" ("cnpj", "email", "endereco", "idFornecedor", "razaoSocial", "telefone") SELECT "cnpj", "email", "endereco", "idFornecedor", "razaoSocial", "telefone" FROM "Fornecedor";
DROP TABLE "Fornecedor";
ALTER TABLE "new_Fornecedor" RENAME TO "Fornecedor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
