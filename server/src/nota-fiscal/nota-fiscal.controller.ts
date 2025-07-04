import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { NotaFiscalService } from './nota-fiscal.service';
import { Item, NotaFiscal } from '@prisma/client';

@Controller('notas-fiscais')
export class NotaFiscalController {
    constructor(private readonly service: NotaFiscalService) {}

    @Get()
    findAll(): Promise<Partial<NotaFiscal>[]> {
        return this.service.findAll();
    }

    @Get(':id/itens')
    findItens(
        @Param('id') id: string
    ): Promise<Item[]> {
        return this.service.findItensByNota(id);
    }

    @Get('pendentes')
    listNotasPendentes() {
        return this.service.listNotasItensPendentes();
    }

    @Get(':idNF/itens-pendentes')
    listItensPendentes(
        @Param('idNF') idNF: string
    ) {
        return this.service.listItensPendentes(idNF);
    }

    @Post()
    create(
        @Body() body: any
    ): Promise<NotaFiscal> {
        const { idNF, ...data } = body;
        return this.service.create(data)
    }
}
