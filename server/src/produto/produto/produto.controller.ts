import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from '@prisma/client';

@Controller('produtos')
export class ProdutoController {
    constructor(private service: ProdutoService) {}

    @Get()
    findAll(): Promise<Produto[]>{
        return this.service.findAll();
    }

    @Post()
    create(@Body() data: Omit<Produto, 'id'>): Promise<Produto> {
        return this.service.create(data);
    }
}
