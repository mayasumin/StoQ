import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ProdutosList } from './pages/produtos/produtos-list/produtos-list';
import { Fornecedores } from './pages/fornecedores/fornecedores';
import { Estoque } from './pages/estoque/estoque';
import { PoliticaSaida } from './pages/politica-saida/politica-saida';
import { ProdutosForm } from './pages/produtos/produtos-form/produtos-form';

export const routes: Routes = [  
    { path: 'dashboard', component: Dashboard },
    { path: 'produtos', component: ProdutosList },
    { path: 'produtos/novo', component: ProdutosForm },
    { path: 'fornecedores', component: Fornecedores },
    { path: 'estoque', component: Estoque },
    { path: 'politicadesaida', component: PoliticaSaida },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
