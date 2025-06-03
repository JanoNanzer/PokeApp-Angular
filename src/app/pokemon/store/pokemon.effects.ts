import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as PokemonActions from './pokemon.actions';
import { PokemonService } from '../services/pokemon.service';

@Injectable()
export class PokemonEffects {
  loadPokemonDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonDetail),
      mergeMap(({ id }) =>
        this.pokemonService.getById(id).pipe(
          map((pokemon) =>
            PokemonActions.loadPokemonDetailSuccess({ pokemon })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonDetailFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}
}
