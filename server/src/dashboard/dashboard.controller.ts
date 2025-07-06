import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

    constructor(private readonly service: DashboardService) {}

    @Get('dashboard/estoque-critico')
    getEstoqueCritico() {
        return this.service.getEstoqueCritico();
    }

    @Get('dashboard/validade-alertas')
    getAlertasValidade() {
        return this.service.getAlertasValidade();
    }

}
