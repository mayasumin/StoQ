import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from 'prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { NotaFiscalModule } from './nota-fiscal/nota-fiscal.module';
import { EstoqueModule } from './estoque/estoque.module';

@Module({
  imports: [
    PrismaModule,
    ProdutoModule,
    FornecedorModule,
    NotaFiscalModule,
    EstoqueModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
