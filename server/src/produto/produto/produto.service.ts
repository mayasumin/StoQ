import { Injectable } from '@nestjs/common';
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
}
