import { Controller, Get, Put, Body } from '@nestjs/common';
import { ConfiguracoesService } from './configuracoes.service';

@Controller('configuracoes')
export class ConfiguracoesController {
    constructor(private readonly service: ConfiguracoesService) {}

    @Get('politica-saida')
    getPolitica() {
        return this.service.getPoliticaSaida
    }

    @Put('politica-saida')
    updatePolitica(
        @Body() body: { politica: 'FIFO' | 'PVPS' }
    ) {
        return this.service.setPoliticaSaida(body.politica)
    }
}
