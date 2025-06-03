import { createAction, props } from '@ngrx/store';
import { PokemonDetails } from '../models/pokemon.model';

export const loadPokemonDetail = createAction(
  '[Pokemon Detail] Load',
  props<{ id: number }>()
);

export const loadPokemonDetailSuccess = createAction(
  '[Pokemon Detail] Load Success',
  props<{ pokemon: PokemonDetails }>()
);

export const loadPokemonDetailFailure = createAction(
  '[Pokemon Detail] Load Failure',
  props<{ error: any }>()
);
