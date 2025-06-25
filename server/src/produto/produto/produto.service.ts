import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Produto } from '@prisma/client';

@Injectable()
export class ProdutoService {
    constructor(private prisma: PrismaService) {}

    findAll(): Promise<Produto[]> {
        return this.prisma.produto.findMany()
    }

    create(data: Omit<Produto, 'id'>): Promise<Produto> {
        return this.prisma.produto.create({ data })
    }

    searchById(id: string): Promise<Produto | null> {
        return this.prisma.produto.findUnique({
            where: { idProduto: id }
        })
    }

    async update(id: string, data: Partial<Omit<Produto, 'id'>>): Promise<Produto> {
        const exists =  await this.prisma.produto.findUnique({ where: { idProduto: id }});
        
        if (!exists) {
            throw new NotFoundException(`Produto com id ${id} não encontrado`)
        }

        return this.prisma.produto.update({
            where: { idProduto: id },
            data,
        });
    }

}
