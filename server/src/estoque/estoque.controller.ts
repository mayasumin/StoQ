import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';

import { EstoqueService } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
    constructor(private readonly service: EstoqueService) {}

    @Post('entrada-lote')
    registerEntradaLote(
        @Body() body
    ) {
        return this.service.registerEntradaLote(body)
    }
}
