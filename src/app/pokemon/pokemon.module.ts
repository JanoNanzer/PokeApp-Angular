import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { pokemonRoutes } from './pokemon.routes';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { pokemonReducer } from './store/pokemon.reducer';
import { PokemonEffects } from './store/pokemon.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(pokemonRoutes),
    StoreModule.forFeature('pokemon', pokemonReducer),
    EffectsModule.forFeature([PokemonEffects]),
    PaginatorModule,
    ButtonModule,
    ProgressSpinnerModule,
    PokemonCardComponent,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    ConfirmDialogModule,
    DropdownModule,
    ChartModule,
  ],
  providers: [PokemonService, ConfirmationService, MessageService],
})
export class PokemonModule {}
