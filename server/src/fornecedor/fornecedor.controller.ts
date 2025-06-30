import { Controller, Get, Post, Body, Patch, Param, NotFoundException } from '@nestjs/common';

import { FornecedorService } from './fornecedor.service';
import { Fornecedor } from '@prisma/client';

@Controller('fornecedores')
export class FornecedorController {
  constructor(private readonly service: FornecedorService) {}

  @Get()
  findAll(): Promise<Fornecedor[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async searchById(
    @Param('id') id:string
  ): Promise<Fornecedor> {
    const fornecedor = await this.service.searchById(id);
    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com id ${id} não encontrado`);
    }
    return fornecedor;
  }

  @Post()
  create(
    @Body() data: Omit<Fornecedor, 'id'>
  ): Promise<Fornecedor> {
    return this.service.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<Fornecedor, 'id'>>
  ): Promise<Fornecedor> {
    return this.service.update(id, data);
  }
}
