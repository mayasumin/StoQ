import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { Fornecedor } from '@prisma/client';

@Injectable()
export class FornecedorService {
  constructor(private prisma: PrismaService) {}
  
  findAll(): Promise<Fornecedor[]> {
    return this.prisma.fornecedor.findMany()
  }

  create(data: Omit<Fornecedor, 'id'>): Promise<Fornecedor> {
    return this.prisma.fornecedor.create({ data })
  }

  searchById(id: string): Promise<Fornecedor | null> {
    return this.prisma.fornecedor.findUnique({
      where: { idFornecedor: id }
    })
  }

  async update(id: string, data: Partial<Omit<Fornecedor, 'id'>>): Promise<Fornecedor> {
    const exists = await this.prisma.fornecedor.findUnique({ where: { idFornecedor: id } });

    if (!exists) {
      throw new NotFoundException(`Fornecedor com id ${id} não encontrado`)
    }

    return this.prisma.fornecedor.update({
      where: { idFornecedor: id },
      data
    });
  }
}
