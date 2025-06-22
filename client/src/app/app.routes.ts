import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Produtos } from './pages/produtos/produtos';
import { Fornecedores } from './pages/fornecedores/fornecedores';
import { Estoque } from './pages/estoque/estoque';
import { PoliticaSaida } from './pages/politica-saida/politica-saida';

export const routes: Routes = [  
    { path: 'dashboard', component: Dashboard },
    { path: 'produtos', component: Produtos },
    { path: 'fornecedores', component: Fornecedores },
    { path: 'estoque', component: Estoque },
    { path: 'politicadesaida', component: PoliticaSaida },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
