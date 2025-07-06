import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Lote, Produto, Retirada } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ConfiguracoesService } from 'src/configuracoes/configuracoes.service';

@Injectable()
export class EstoqueService {
    constructor(
        private readonly prisma: PrismaService,
        private configService: ConfiguracoesService
    ) {}

    registerEntradaLote(data: {
        itemId: string;
        numeroLote: string;
        dataValidade: Date;
        qtdRecebida: number;
        localArmazenamento?: string;
        observacoes?: string;
        responsavel: string;
    }) {
        const { itemId, numeroLote, dataValidade, qtdRecebida, localArmazenamento, observacoes, responsavel } = data;

        return this.prisma.item.findUnique({ where: { idItem: itemId } })
            .then(item => {
                if (!item) throw new NotFoundException('Item não encontrado');
                if (item.baixado) throw new BadRequestException('Item já foi baixado');

                return this.prisma.$transaction(async prisma => {
                    await prisma.item.update({
                        where: { idItem: itemId },
                        data: { baixado: true }
                    });

                    const lote = await prisma.lote.create({
                        data: { 
                            itemId,
                            produtoId: item.produtoId,
                            numero: numeroLote,
                            dataEntrada: new Date(),
                            dataValidade,
                            qtdRecebida,
                            localArmazenamento
                        }
                    });

                    await prisma.produto.update({
                        where: { idProduto: item.produtoId },
                        data: {
                            qntEstoque: {
                                increment: qtdRecebida
                            }
                        }
                    });

                    const movimentacao = await prisma.movimentacao.create({
                        data: {
                            produtoId: item.produtoId,
                            loteId: lote.idLote,
                            qntRetirada: 0,
                            dataHora: new Date(),
                            responsavel,
                            observacoes: observacoes || `Entrada de Lote ${numeroLote}`
                        }
                    });

                    return { lote, movimentacao }
                });
            })
            .catch(err => {
                console.error('Erro ao registrar entrada de lote', err);

                if (err instanceof NotFoundException || err instanceof BadRequestException) {
                    throw err;
                }
                
                throw new InternalServerErrorException('Erro ao registrar entrada de lote');
            })
    }

    getProdutosComEstoque(): Promise<(Produto & { lotes: Lote[] })[]> {
        return this.prisma.produto.findMany({
            where: {
                qntEstoque: { gt: 0 }
            },
            include: {
                lotes: true
            }
        })
    }

    sugestLote(produtoId: string): Promise<(Lote & { retiradas: Retirada[] }) | null>  {
        return this.configService.getPoliticaSaida()
        .then(politica => {
            return this.prisma.lote.findMany({
                where: { produtoId },
                include: {
                    retiradas: true
                },
                orderBy: politica === 'PVPS' ? { dataValidade: 'asc' } : { dataEntrada: 'asc' }
            })
            .then(lotes => {
                const loteDisponivel = lotes.find(lote => {
                    const totalRetirado = lote.retiradas.reduce((soma, r) => soma + r.qtdRetirada, 0)
                    return lote.qtdRecebida > totalRetirado;
                });

                return loteDisponivel || null
            })
        })
    }

    registerRetirada(data: {
        produtoId: string;
        loteId: string;
        quantidade: number;
        responsavel: string
    }): Promise<[Retirada, Produto]> {
        return this.prisma.lote.findUnique({
            where: {idLote: data.loteId },
            include: { retiradas: true },
        })
        .then(lote => {
            if (!lote || typeof lote.qtdRecebida !== 'number') {
                return  Promise.reject(new BadRequestException('Lote inválido ou corrompido.'));
            }
            const totalRetirado = lote.retiradas.reduce((soma, r) => soma + r.qtdRetirada, 0);
            const disponivel = lote.qtdRecebida - totalRetirado

            if (data.quantidade > disponivel) {
                return Promise.reject(new BadRequestException('Quantidade insuficiente no lote.'));
            }

            return this.prisma.$transaction([
                this.prisma.retirada.create({
                    data: {
                        produtoId: data.produtoId,
                        loteId: data.loteId,
                        qtdRetirada: data.quantidade,
                        responsavel: data.responsavel,
                        dataHora: new Date(),
                    },
                }),
                this.prisma.produto.update({
                    where: { idProduto: data.produtoId },
                    data: {
                        qntEstoque: {
                            decrement: data.quantidade,
                        },
                    },
                }), 
            ]) as Promise<[Retirada, Produto]>
        })
    }

    getHistoricoRetiradas(): Promise<
    (Retirada & {
        produto: { nome: string };
        lote: { numero: string; dataValidade: Date }
    })[]> {
        return this.prisma.retirada.findMany({
            include: {
                produto: {
                    select: {
                        nome: true
                    }
                },
                lote: {
                    select: {
                        numero: true,
                        dataValidade: true
                    },
                },
            },
            orderBy: {
                dataHora: 'desc'
            }
        })
    }

    getHistoricoEntradas() {
        return this.prisma.lote.findMany({
        orderBy: { dataEntrada: 'desc' },
        select: {
            idLote: true,
            numero: true,
            dataEntrada: true,
            dataValidade: true,
            qtdRecebida: true,
            produto: {
                select: {
                    nome: true
                }
            }
        }
        });
    }


}
