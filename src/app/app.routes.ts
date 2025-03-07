import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'dashboard',
        loadComponent:() => import('./gifs/pages/dasboard-page/dasboard-page.component')
    },
    {
        path:'**',
        redirectTo:'dashboard'
    }
];
