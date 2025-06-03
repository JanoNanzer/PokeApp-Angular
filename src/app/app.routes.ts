import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule),
  },
  {
    path: '**',
    redirectTo: 'pokemon'
  }
];