import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { EstoqueService } from './estoque.service';
import { Lote, Movimentacao, Produto, Retirada } from '@prisma/client';

type NovaEntradaLote = {
  itemId: string;
  produtoId: string;
  numeroLote: string;
  dataValidade: Date;
  qtdRecebida: number;
  localArmazenamento?: string;
  observacoes?: string;
  responsavel: string;
};

type NovaRetirada = {
  produtoId: string;
  loteId: string;
  quantidade: number;
  responsavel: string;
};

@Controller('estoque')
export class EstoqueController {
    constructor(private readonly service: EstoqueService) {}

    @Post('entrada-lote')
    registerEntradaLote(
        @Body() body: NovaEntradaLote
    ): Promise<{ lote:Lote; movimentacao: Movimentacao }> {
        return this.service.registerEntradaLote(body)
    }

    @Get('disponivel')
    getProdutosComEstoque(): Promise<(Produto & { lotes: Lote[] })[]> {
        return this.service.getProdutosComEstoque();
    }

    @Get('sugerir-lote')
    sugestLote(
        @Query('produtoId') produtoId: string
    ): Promise<Lote | null> {
        return this.service.sugestLote(produtoId);
    }

    @Post('retirada')
    registRetirada(
        @Body() body: NovaRetirada
    ): Promise<[Retirada, Produto]> {
        return this.service.registerRetirada(body);
    }

    @Get('historico-retiradas')
    getHistoricoRetiradas() {
        return this.service.getHistoricoRetiradas();
    }

}
