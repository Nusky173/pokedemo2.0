import { Component, Input } from '@angular/core';
import { PokemonDetail, Pokemon } from '../../type/type';
import { PokemonService } from '../../service/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { Route } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {

  //data

  @Input() pokemon: Pokemon | undefined = undefined;

  //properties

  pokemonDetails?: PokemonDetail;

  constructor(private pokeService: PokemonService) {}

  //function 

  ngOnInit() {
    //getDetails
    if(this.pokemon) {
      this.pokeService.getDetails(this.pokemon.id).then((data) => {
          this.pokemonDetails = data;
      })
    }
  }

}
