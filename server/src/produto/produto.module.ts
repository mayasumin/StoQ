import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({
  imports: [PrismaModule],
  providers: [ProdutoService],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
