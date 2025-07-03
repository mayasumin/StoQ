import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ProdutosList } from './pages/produtos/produtos-list/produtos-list';
import { ProdutosForm } from './pages/produtos/produtos-form/produtos-form';
import { FornecedoresList } from './pages/fornecedores/fornecedores-list/fornecedores-list';
import { FornecedoresForm } from './pages/fornecedores/fornecedores-form/fornecedores-form';
import { Estoque } from './pages/estoque/estoque';
import { PoliticaSaida } from './pages/politica-saida/politica-saida';
import { NotaFiscalList } from './pages/nota-fiscal/nota-fiscal-list/nota-fiscal-list';
import { NotaFiscalForm } from './pages/nota-fiscal/nota-fiscal-form/nota-fiscal-form';

export const routes: Routes = [  
    { path: 'dashboard', component: Dashboard },
    { path: 'produtos', component: ProdutosList },
    { path: 'produtos/novo', component: ProdutosForm },
    { path: 'fornecedores', component: FornecedoresList },
    { path: 'fornecedores/novo', component: FornecedoresForm },
    { path: 'estoque', component: Estoque },
    { path: 'notasdeentrada', component: NotaFiscalList},
    { path: 'notasdeentrada/novo', component: NotaFiscalForm },
    { path: 'politicadesaida', component: PoliticaSaida },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];