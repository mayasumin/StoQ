-- CreateTable
CREATE TABLE "Retirada" (
    "idRetirada" TEXT NOT NULL PRIMARY KEY,
    "produtoId" TEXT NOT NULL,
    "loteId" TEXT NOT NULL,
    "qtdRetirada" REAL NOT NULL,
    "responsavel" TEXT NOT NULL,
    "dataHora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Retirada_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("idProduto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Retirada_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("idLote") ON DELETE RESTRICT ON UPDATE CASCADE
);
