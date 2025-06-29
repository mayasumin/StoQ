import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { FornecedorModule } from './fornecedor/fornecedor/fornecedor.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';

@Module({
  imports: [
    PrismaModule,
    ProdutoModule,
    FornecedorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
