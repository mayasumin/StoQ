-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movimentacao" (
    "idMovimentacao" TEXT NOT NULL PRIMARY KEY,
    "produtoId" TEXT NOT NULL,
    "loteId" TEXT NOT NULL,
    "qntRetirada" INTEGER NOT NULL,
    "dataHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsavel" TEXT NOT NULL,
    "observacoes" TEXT,
    CONSTRAINT "Movimentacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movimentacao_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("idLote") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Movimentacao" ("dataHora", "idMovimentacao", "loteId", "observacoes", "produtoId", "qntRetirada", "responsavel") SELECT "dataHora", "idMovimentacao", "loteId", "observacoes", "produtoId", "qntRetirada", "responsavel" FROM "Movimentacao";
DROP TABLE "Movimentacao";
ALTER TABLE "new_Movimentacao" RENAME TO "Movimentacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
