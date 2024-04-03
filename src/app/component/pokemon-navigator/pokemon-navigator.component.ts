import { Component, Input } from '@angular/core';
import { PokemonDetail, PokemonSpecies } from '../../type/type';
import { PokemonSpeciesService } from '../../service/pokemon-species.service';
import { MAX_POKEMON_COUNT } from '../../commons';
import { PokemonService } from '../../service/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-navigator',
  templateUrl: './pokemon-navigator.component.html',
  styleUrl: './pokemon-navigator.component.css'
})
export class PokemonNavigatorComponent {

  @Input() currentPokemonNav: PokemonDetail | undefined = undefined;

  @Input() borderColor: string = '';

  currentPokemonPrec?: PokemonDetail = undefined;
  currentPokemonNext?: PokemonDetail = undefined;

  constructor(
    private pokemonDetailService: PokemonService,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log(this.currentPokemonNav)
    
    if(this.currentPokemonNav != undefined) {
      const previousId = this.currentPokemonNav?.id -1;
      const nextId = this.currentPokemonNav?.id +1;
      console.log(previousId, " ", nextId)

      if(previousId > 0 ) {
        await this.pokemonDetailService.getDetails(previousId + '').then((data) => {
          this.currentPokemonPrec = data
        })
      }

      if(nextId < MAX_POKEMON_COUNT ) {
        await this.pokemonDetailService.getDetails(nextId + '').then((data) => {
          this.currentPokemonNext = data
        })
      }
    }
  }

  _goToPokemonPage(id: number) {
    this.router.navigateByUrl("/pokemon/" + id)
  }

}
