import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EstoqueService {
    constructor(private readonly prisma: PrismaService) {}

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
                            numero: numeroLote,
                            dataEntrada: new Date(),
                            dataValidade,
                            qtdRecebida,
                            localArmazenamento,
                            observacoes
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
}
