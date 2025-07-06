import { Module } from '@nestjs/common';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { ConfiguracoesModule } from 'src/configuracoes/configuracoes.module';

@Module({
    imports: [ConfiguracoesModule],
    controllers: [EstoqueController],
    providers: [EstoqueService]
})
export class EstoqueModule {}
