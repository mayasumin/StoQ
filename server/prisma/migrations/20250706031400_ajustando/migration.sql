-- CreateTable
CREATE TABLE "_LoteToProduto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_LoteToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "Lote" ("idLote") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LoteToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "Produto" ("idProduto") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_LoteToProduto_AB_unique" ON "_LoteToProduto"("A", "B");

-- CreateIndex
CREATE INDEX "_LoteToProduto_B_index" ON "_LoteToProduto"("B");
