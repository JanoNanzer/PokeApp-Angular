import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { lastValueFrom } from 'rxjs';
import { TOTAL_POKEMONS, POKEMONS_PER_PAGE } from '../../../shared/constants';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Type } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  searchForm: FormGroup;

  totalPokemons = TOTAL_POKEMONS;

  pokemonsPerPage = POKEMONS_PER_PAGE;

  pokemonList: any = [];

  loading: boolean = true;

  error: boolean = false;

  refresh: boolean = false;

  catalogueTypes: Type[] = [];

  isFiltered: boolean = false;

  totalPokemonFiltered: number = 0;

  constructor(
    private readonly pokemonService: PokemonService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.searchForm = this.fb.group({
      name: new FormControl(''),
      type: new FormControl(''),
      order: new FormControl(''),
      power: new FormControl(''),
    });
  }
  async ngOnInit() {
    await this.getTypes();
    await this.getPokemonList(0);
  }

  async getTypes() {
    const result = await lastValueFrom(this.pokemonService.getTypes());
    const filterNonType = result.filter(
      (type) => type.code !== 'unknown' && type.code !== 'stellar'
    );
    this.catalogueTypes = filterNonType;
  }

  async getPokemonList(offset: number) {
    try {
      this.loading = true;
      const result = await lastValueFrom(
        this.pokemonService.getList(this.pokemonsPerPage, offset)
      );
      this.pokemonList = result;
    } catch (error) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  onPaginator(event: any) {
    const offset = event.page * this.pokemonsPerPage;
    window.scrollTo(0, 0);
    this.getPokemonList(offset);
  }

  async search() {
    const name = this.searchForm.value.name;
    if (name === '' || !name) return;

    const pokemon = [];
    try {
      this.loading = true;
      const result = await lastValueFrom(this.pokemonService.getByName(name));
      pokemon.push(result);
      this.pokemonList = pokemon;
      this.refresh = true;
    } catch (error) {
      this.error = true;
      this.confirmationService.confirm({
        message: 'Pokemon not found, please try again with another name',
        header: ' ',
        acceptVisible: false,
        rejectVisible: false,
        closeOnEscape: true,
      });

      await this.getPokemonList(0);
    } finally {
      this.loading = false;
      this.searchForm.reset();
    }
  }

  refreshList() {
    this.getPokemonList(0);
    this.refresh = false;
    this.searchForm.reset('');
  }

  async selectedType(event: any) {
    const type = event.value?.code;
    if (!type) return;

    try {
      this.loading = true;
      const result = await lastValueFrom(
        this.pokemonService.getByType(type, 1, 50)
      );
      this.isFiltered = true;
      this.totalPokemonFiltered = result.total;
      this.pokemonList = result.results;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  async clearType(event: any) {
    this.isFiltered = false;
    this.totalPokemonFiltered = 0;
    await this.getPokemonList(0);
  }

  async onPaginatorFiltered(event: any) {
    window.scrollTo(0, 0);
    const type = this.searchForm.value.type.code;
    const offset = event.page + 1;
    try {
      this.loading = true;
      const result = await lastValueFrom(
        this.pokemonService.getByType(type, offset, 30)
      );
      this.isFiltered = true;
      this.totalPokemonFiltered = result.total;
      this.pokemonList = result.results;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
