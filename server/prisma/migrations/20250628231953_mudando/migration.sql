-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "idProduto" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "unMedida" TEXT,
    "qntMin" INTEGER NOT NULL,
    "qntEstoque" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Ativo'
);
INSERT INTO "new_Produto" ("descricao", "idProduto", "nome", "qntEstoque", "qntMin", "status", "unMedida") SELECT "descricao", "idProduto", "nome", "qntEstoque", "qntMin", "status", "unMedida" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
