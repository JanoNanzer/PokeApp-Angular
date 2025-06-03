import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { pokemonRoutes } from './pokemon.routes';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { pokemonReducer } from './store/pokemon.reducer';
import { PokemonEffects } from './store/pokemon.effects';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(pokemonRoutes),
    StoreModule.forFeature('pokemon', pokemonReducer),
    EffectsModule.forFeature([PokemonEffects]),
    PokemonCardComponent, 
  ],
  providers: [PokemonService, ConfirmationService, MessageService],
})
export class PokemonModule {}
