import { Controller, Get, Post, Body, Patch, Param, NotFoundException } from '@nestjs/common';

import { ProdutoService } from './produto.service';
import { Produto } from '@prisma/client';

@Controller('produtos')
export class ProdutoController {
    constructor(private readonly service: ProdutoService) {}

    @Get()
    findAll(): Promise<Produto[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async searchById(
        @Param('id') id: string
    ): Promise<Produto> {
        const produto = await this.service.searchById(id);
        if (!produto) {
            throw new NotFoundException(`Produto com id ${id} não encontrado`);
        }
        return produto;
    }

    @Post()
    create(
        @Body() data: Omit<Produto, 'id'>
    ): Promise<Produto> {
        return this.service.create(data);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: Partial<Omit<Produto, 'id'>>
    ): Promise<Produto> {
        return this.service.update(id, data);
    }
}