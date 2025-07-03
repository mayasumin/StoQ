import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { Fornecedor, Item, NotaFiscal } from '@prisma/client';

@Injectable()
export class NotaFiscalService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(): Promise<{
        idNF: string;
        numero: string;
        serie: string;
        dataEmissao: Date;
        fornecedor: { razaoSocial: string };
        itens: {
            qntdRecebida: number;
            precoUnit: number;
            ncm: string | null;
            cfop: string| null;
            produto: { nome: string }
        }[],
    }[]> {
        return this.prisma.notaFiscal.findMany({
            select: {
                idNF: true,
                numero: true,
                serie: true,
                dataEmissao: true,
                fornecedor: {
                    select: {
                        razaoSocial: true
                    }
                },
                itens: {
                    select: {
                        qntdRecebida: true,
                        precoUnit: true,
                        ncm: true,
                        cfop: true,
                        produto: {
                            select: {
                                nome: true
                            }
                        }
                    }
                }    
            },
        });
    }

    findItensByNota(idNF: string): Promise<Item[]> {
        return this.prisma.item.findMany({
            where: { notafiscalId: idNF },
            include: {
                produto: {
                    select: {
                        nome: true
                    }
                }
            }
        })
    }

    create(data: {
        fornecedorId: string;
        numero: string;
        serie: string;
        dataEmissao: Date;
        itens: Omit<Item, 'id'>[]
    }): Promise<NotaFiscal & { 
        itens: Item[]; 
        fornecedor: Fornecedor 
    }> {
        return this.prisma.notaFiscal.create({
            data: {
                fornecedorId: data.fornecedorId,
                numero: data.numero,
                serie: data.serie,
                dataEmissao: data.dataEmissao,
                itens: { create: data.itens.map(item => ({
                    qntdRecebida: item.qntdRecebida, 
                    precoUnit: item.precoUnit,
                    ncm: item.ncm,
                    cfop: item.cfop,
                    produto: {
                        connect: {
                            idProduto: item.produtoId
                        }
                    }
                })) }
            },
            include: { itens: true, fornecedor: true }
        })
    }
}
