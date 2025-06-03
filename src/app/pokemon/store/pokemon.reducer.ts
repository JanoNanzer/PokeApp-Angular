import { createReducer, on } from '@ngrx/store';
import { PokemonDetails } from '../models/pokemon.model';
import {
  loadPokemonDetail,
  loadPokemonDetailFailure,
  loadPokemonDetailSuccess,
} from './pokemon.actions';

export interface PokemonState {
  detail: PokemonDetails | null;
  loading: boolean;
  error: any;
}

export const initialState: PokemonState = {
  detail: null,
  loading: false,
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemonDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadPokemonDetailSuccess, (state, { pokemon }) => ({
    ...state,
    detail: pokemon,
    loading: false,
  })),
  on(loadPokemonDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
