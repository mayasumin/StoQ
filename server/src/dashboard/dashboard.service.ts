import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Produto } from '@prisma/client';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) {}

    getEstoqueCritico(): Promise<Produto[]> {
        return this.prisma.produto.findMany()
        .then(produtos => produtos.filter(p => p.qntEstoque < p.qntMin));
    }

    getAlertasValidade(): Promise<{
        produto: { nome: string };
        lote: {
            numero: string,
            dataValidade: Date;
            qtdRecebida: number
        };
        status: 'VENCIDO' | 'PROXIMO'
    }[]> {
        const hoje = new Date();
        const seteDiasDepois = new Date();
        seteDiasDepois.setDate(hoje.getDate() + 7)

        return this.prisma.lote.findMany({
            where: {
                dataValidade: {
                    lte: seteDiasDepois,
                }
            },
            include: {
                produto: {
                    select: { nome: true }
                }
            },
            orderBy: { dataValidade: 'asc' }
        }).then(lotes => {
            return lotes.map(lote => ({
                produto: { nome: lote.produto.nome },
                lote: {
                    numero: lote.numero,
                    dataValidade: lote.dataValidade,
                    qtdRecebida: lote.qtdRecebida
                },
                status: lote.dataValidade < hoje ? 'VENCIDO' : 'PROXIMO'
            }))
        })
    }
}
