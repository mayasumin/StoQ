import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ConfiguracoesService {
    constructor(private prisma: PrismaService) {}

    getPoliticaSaida(): Promise<'PVPS' | 'FIFO'> {
        return this.prisma.configuracao.findUnique({
            where: {
                id: 1
            }
        }).then(config => config?.politicaSaida || 'PVPS')
    }

    setPoliticaSaida(politica: 'FIFO' | 'PVPS'): Promise<any> {
        return this.prisma.configuracao.upsert({
            where: { id: 1 },
            update: { politicaSaida: politica },
            create: { id: 1, politicaSaida: politica }
        })
    }
}
