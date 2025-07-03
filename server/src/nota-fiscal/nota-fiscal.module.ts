import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { NotaFiscalService } from './nota-fiscal.service';
import { NotaFiscalController } from './nota-fiscal.controller';

@Module({
    imports: [PrismaModule],
    providers: [NotaFiscalService],
    controllers: [NotaFiscalController]
})
export class NotaFiscalModule {}
