import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

export const selectPokemonFeature =
  createFeatureSelector<PokemonState>('pokemon');

export const selectPokemonDetail = createSelector(
  selectPokemonFeature,
  (state) => state.detail
);

export const selectPokemonLoading = createSelector(
  selectPokemonFeature,
  (state) => state.loading
);
