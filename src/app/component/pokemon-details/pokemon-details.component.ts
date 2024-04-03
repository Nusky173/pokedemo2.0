import { Component } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { Chain, EvolutionChain, EvolutionDetailIHM, EvolvesTo, Generation, Item, PokemonDetail, PokemonSpecies, Stat, StatIHM, Type, TypeCss } from '../../type/type';
import { ActivatedRoute, RouteReuseStrategy, Router, provideRouter } from '@angular/router';
import { PokemonSpeciesService } from '../../service/pokemon-species.service';
import { ColorCss, GenerationName, StatColorValue, _getCssColor, _getGenerationName, _getStatColorValue, colorsTypes, generation } from '../../commons';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EvolutionChainService } from '../../service/evolution-chain.service';
import { ObjectService } from '../../service/object.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent {

  pokemonDetails?: PokemonDetail

  pokemonSpecies?: PokemonSpecies;

  evolutionChain?: EvolutionChain;

  evolutionChainIdList: string[] = [];

  currentPokemonNav?: PokemonDetail = undefined;

  id: string = "0";
  generation: string = "";

  officialArtwork?: string = "";
  officialArtworkShiny?: string = "";
  types: TypeCss[] = [];
  isShinyDisplayed: Boolean = false;

  evolutionChainUrl: string = '';

  evStats: StatIHM[] = [];
  baseStats: StatIHM[] = [];

  evolutionChainIhm: EvolutionDetailIHM[] = [];

  evolutionItem: Item[] = [];

  constructor(
    private pokemonService: PokemonService,  
    private pokemonSpeciesService: PokemonSpeciesService,
    private evolutionChainService: EvolutionChainService,
    private objectService: ObjectService,
    private route: ActivatedRoute, 
    private router: Router
    ) {}

  async ngOnInit() {
    
    this.id = this.route.snapshot.paramMap.get('id')!
    await this.pokemonService.getDetails(this.id).then((data) => {
      this.pokemonDetails = data;
      this.currentPokemonNav = data;
    })
    
    await this.pokemonSpeciesService.getPokemonSpecies(this.id).then(data => {
      this.pokemonSpecies = data;
    }).finally(() => {
      this.evolutionChainUrl = this.pokemonSpecies!.evolution_chain.url
    })
    
    await this.evolutionChainService.getEvolutionChain(this.evolutionChainUrl).then(data => {
      this.evolutionChain = data
      
    })
    .finally(() => 
      this._getDetails()
    )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async _getEvolutionChainDetails() {
    //getAllEvolutionId
    if(this.evolutionChain) {
      const chain = this.evolutionChain.chain

      if(chain.evolves_to.length > 1) {
        await this._getMultipleEvolutionChainDetails(chain)
      } 
      else {
        chain.evolves_to.forEach(async (evolve, i=0) => {

          if(evolve.evolution_details[i].min_level) {

            this.evolutionChainIhm.push({
              name: chain.species.name, 
              level: evolve.evolution_details[i].min_level
            })

          } else if(evolve.evolution_details[i].item) {
            this.evolutionChainIhm.push({
              name: chain.species.name, 
              itemName: evolve.evolution_details[i].item.name
            }) 
          } else {
            this.evolutionChainIhm.push({
              name: chain.species.name,
            }) 
          }

          if(evolve.evolves_to.length > 0) {
            const evolutionDetails = evolve.evolves_to[i].evolution_details[i];
            this.evolutionChainIhm.push({
              name:evolve.species.name, 
              level: evolutionDetails.min_level ? 
              evolutionDetails.min_level : 
                    undefined,
              itemName: evolutionDetails.item ?
              evolutionDetails.item.name :
                    undefined,
            })
            this._getEvolutionChainDetailsRec(evolve.evolves_to)
          } else if (evolve.species){
            this.evolutionChainIhm.push({name: evolve.species.name})
          }
        })
      }
      
      await this._getEvolutionDetailObject();
      await this._getEvolutionChainArtwork();
    }    
  }

  _getEvolutionChainDetailsRec(evolveTo: EvolvesTo[]) {
    let i = 0;
    while(evolveTo.length > i) {
      this.evolutionChainIhm.push({
        name: evolveTo[i].species.name, 
        level: evolveTo[i].evolves_to[i] ? 
                  evolveTo[i].evolves_to[i].evolution_details[i].min_level : 
                  undefined,
      })

      if(evolveTo[i].evolves_to.length > 0) {
        this._getEvolutionChainDetailsRec(evolveTo[i].evolves_to)
      }

      i++
    }
  }

  async _getEvolutionChainArtwork() {    
    await this.evolutionChainIhm.forEach((e) => {
      this.pokemonService.getDetails(e.name).then((data) => {

        e.artwork = data.sprites.other['official-artwork'].front_default;
        e.artworkShiny = data.sprites.other['official-artwork'].front_shiny;
      })
    })

  }

  async _getMultipleEvolutionChainDetails(chain: Chain) {
    const evolveTo = chain.evolves_to.slice(); 
    const evolveLength = evolveTo.length;
    let i = 0;

    this.evolutionChainIhm.push({
      name: chain.species.name,
    }) 
   
    while(evolveLength > i) {

      if(!!evolveTo[i].evolution_details[i]?.min_level) {
        this.evolutionChainIhm.push({
          name: evolveTo[i].species.name,
          level: evolveTo[i].evolution_details[0].min_level
        })

      } else if(!!evolveTo[i].evolution_details[0]?.item) {
        this.evolutionChainIhm.push({
          name: evolveTo[i].species.name,
          itemName: evolveTo[i].evolution_details[0].item.name
        }) 
      } else {
        
        this.evolutionChainIhm.push({
          name: evolveTo[i].species.name,
        }) 
      }

      i++
    }
  }

  async _getEvolutionDetailObject() {
    this.evolutionChainIhm.forEach((evolutionChain) => {
      if(evolutionChain.itemName) {
        this.objectService.get(evolutionChain.itemName).then((res) => {
          evolutionChain.itemSprite = res.sprites.default
        })
      }
    })
  }

  async _getDetails() {
    if(this.pokemonDetails && this.pokemonSpecies) {
    
      this._getId();
      this._getArtwork();
      this._getType();
      this._getGeneration();
      this._getStats();
      await this._getEvolutionChainDetails();
    }
  }

  _getId() {
    if(this.pokemonDetails) {
      if(this.pokemonDetails.id > 1000) {
        this.id = "#"+this.pokemonDetails.id;
      } else if(this.pokemonDetails.id > 100) {
        this.id = "#0"+this.pokemonDetails.id;
      } else if(this.pokemonDetails.id > 10) {
        this.id = "#00"+this.pokemonDetails.id;
      } else {
        this.id = "#000"+this.pokemonDetails.id;
      }
    }
  }

  _getArtwork() {
    this.officialArtwork = this.pokemonDetails?.sprites.other["official-artwork"].front_default;
    this.officialArtworkShiny = this.pokemonDetails?.sprites.other["official-artwork"].front_shiny;
  }

  _getStats() {
    this.pokemonDetails!.stats.forEach((e) => {
      this.evStats.push({value: e.effort, name: e.stat.name, color: _getStatColorValue(e.stat.name as StatColorValue)});
      this.baseStats.push({value: e.base_stat, name: e.stat.name, color: _getStatColorValue(e.stat.name as StatColorValue)});
    })
  }

  _getType() {
    this.pokemonDetails!.types.map(e => {
      
      const type: TypeCss = {
        name: e.type.name,
        css:  _getCssColor(e.type.name as ColorCss)
      }

      this.types.push(type);
    })
  }

  _getGeneration() {
    this.generation = _getGenerationName(this.pokemonSpecies?.generation.name as GenerationName)
  }

  _goToPokemonPage(evolution: EvolutionDetailIHM) {
    this.router.navigateByUrl("/pokemon/" + evolution.name)
  }

  _slideChange(event: MatSlideToggleChange) {
    this.isShinyDisplayed = event.checked;
  }
}
