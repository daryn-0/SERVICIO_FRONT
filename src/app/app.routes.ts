import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarcaComponent } from './marca/marca.component';
import { TipoComponent } from './tipo/tipo.component';
import { CocheComponent } from './coche/coche.component';

export const routes: Routes = [
    {
        path : '',
        component : HomeComponent,
        title : 'Pagina de Inicio'
    },
    {
        path : 'marca',
        component : MarcaComponent,
        title : 'Marca'
    },
    {
        path : 'tipo',
        component : TipoComponent,
        title : 'Tipo'
    },
    {
        path : 'coche',
        component : CocheComponent,
        title : 'Coche'

    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
