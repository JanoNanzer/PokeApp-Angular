import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  private POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

  private TYPE_API_BASE_URL = 'https://pokeapi.co/api/v2/type';

  private mapPokemonDetails(pokemon: any) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other['official-artwork'].front_default,
      types: pokemon.types,
      stats: pokemon.stats,
      height: pokemon.height,
      weight: pokemon.weight,
    };
  }

  private mapTypes(type: any) {
    return {
      name: type.name.toUpperCase(),
      code: type.name,
    };
  }

  getList(limit: number, offset: number): Observable<any[]> {
    const url = `${this.POKEMON_API_BASE_URL}?limit=${limit}&offset=${offset}`;

    return this.httpClient
      .get<{ results: { name: string; url: string }[] }>(url)
      .pipe(
        switchMap((res) => {
          const detailRequests: Observable<any>[] = res.results.map((pokemon) =>
            this.httpClient.get<any>(pokemon.url)
          );
          return forkJoin(detailRequests);
        }),
        map((pokemonList: any[]) => pokemonList.map(this.mapPokemonDetails))
      );
  }

  getById(id: number): Observable<any> {
    const url = `${this.POKEMON_API_BASE_URL}/${id}`;
    return this.httpClient.get<any>(url).pipe(map(this.mapPokemonDetails));
  }

  getByName(name: string): Observable<any> {
    const url = `${this.POKEMON_API_BASE_URL}/${name}`;
    return this.httpClient.get<any>(url).pipe(map(this.mapPokemonDetails));
  }

  getTypes(): Observable<any[]> {
    const url = this.TYPE_API_BASE_URL;
    return this.httpClient
      .get<any>(url)
      .pipe(map((res) => res.results.map(this.mapTypes)));
  }

  getByType(
    type: string,
    page: number,
    pageSize: number
  ): Observable<{ total: number; results: any[] }> {
    const url = `${this.TYPE_API_BASE_URL}/${type}`;

    return this.httpClient.get<any>(url).pipe(
      switchMap((res) => {
        const allPokemon = res.pokemon.map((p: any) => p.pokemon);
        const total = allPokemon.length;

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const pagedPokemon = allPokemon.slice(start, end);

        const detailRequests = pagedPokemon.map((p: any) =>
          this.httpClient.get<any>(p.url)
        );

        return forkJoin(detailRequests).pipe(
          map((pokemonList: any) => ({
            total,
            results: pokemonList.map(this.mapPokemonDetails),
          }))
        );
      })
    );
  }
}
