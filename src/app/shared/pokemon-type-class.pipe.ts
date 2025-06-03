import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonTypeClass',
  standalone: true,
})
export class PokemonTypeClassPipe implements PipeTransform {
  transform(type: string): string {
    return `type-${type.toLowerCase()}`;
  }
}