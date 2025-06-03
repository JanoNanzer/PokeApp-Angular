import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TYPE_IMAGE_MAP } from '../../../shared/constants';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PokemonTypeClassPipe } from '../../../shared/pokemon-type-class.pipe';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, PokemonTypeClassPipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: any;

  TYPE_IMAGE_MAP = TYPE_IMAGE_MAP;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    // console.log(this.pokemon);
  }

  goDetails() {
    this.router.navigate([`/pokemon/${this.pokemon.id}`]);
  }
}
