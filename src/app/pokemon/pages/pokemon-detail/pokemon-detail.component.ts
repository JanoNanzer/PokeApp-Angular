import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as PokemonActions from '../../store/pokemon.actions';
import { selectPokemonDetail } from '../../store/pokemon.selectors';
import { TYPE_IMAGE_MAP } from '../../../shared/constants';
import { TYPE_COLORS_MAP } from '../../../shared/constants';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemon$ = this.store.select(selectPokemonDetail);
  private destroy$ = new Subject<void>();
  TYPE_IMAGE_MAP = TYPE_IMAGE_MAP;

  data: any;

  options: any;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = Number(params.get('id'));

      if (id) {
        this.store.dispatch(PokemonActions.loadPokemonDetail({ id }));
      }
    });

    this.pokemon$.pipe(takeUntil(this.destroy$)).subscribe((pokemon) => {
      if (!pokemon) return;

      const statMap = {
        HP: 0,
        Attack: 0,
        Defense: 0,
        'special-attack': 0,
        'special-defense': 0,
        speed: 0,
      };

      const orderedStatNames = [
        'hp',
        'attack',
        'defense',
        'special-attack',
        'special-defense',
        'speed',
      ];

      const orderedLabels = [
        'hp',
        'Attack',
        'Defense',
        'Special Attack',
        'Special Defense',
        'Speed',
      ];

      pokemon.stats.forEach((s) => {
        const name = s.stat.name as keyof typeof statMap;
        statMap[name] = s.base_stat;
      });

      const color = TYPE_COLORS_MAP[pokemon.types?.[0]?.type?.name] || '#666';
      const statValues = orderedStatNames.map((name) => {
        const stat = pokemon.stats.find((s) => s.stat.name === name);
        return stat?.base_stat ?? 0;
      });

      this.data = {
        labels: orderedLabels,
        datasets: [
          {
            label: pokemon.name.toUpperCase(),
            data: statValues,
            backgroundColor: `${color}33`,
            borderColor: color,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color,
          },
        ],
      };

      this.options = {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: color,
            },
          },
        },
        scales: {
          r: {
            angleLines: {
              color: '#ddd',
            },
            grid: {
              color: '#ccc',
            },
            pointLabels: {
              color: color,
              font: {
                size: 14,
              },
            },
            ticks: {
              color: '#555',
              backdropColor: 'transparent',
            },
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
