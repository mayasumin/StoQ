-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "idItem" TEXT NOT NULL PRIMARY KEY,
    "baixado" BOOLEAN NOT NULL DEFAULT false,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
