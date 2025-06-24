import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ProdutoService } from './produto/produto.service';
import { ProdutoController } from './produto/produto.controller';

@Module({
  imports: [PrismaModule],
  providers: [ProdutoService],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
