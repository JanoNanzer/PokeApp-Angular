export interface PokemonSummary {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  image: string;
  name: string;
  types: { slot: number; type: { name: string; url: string } }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  height: number;
  weight: number;
}

export const PAGE_SIZE = 30;

export interface Type {
  name: string;
  code: string;
}
