import { Component, HostListener, ViewChild } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { PokeServiceRes, Pokemon } from '../../type/type';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MAX_POKEMON_COUNT } from '../../commons';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css',
  providers: [PokemonService]
})
export class PokeListComponent {

  //-- Properties -- 
  pokeList: Pokemon[] = [];
  
  paginatedList?: PokeServiceRes;
  currentPageIndex : number = 0;
  pageSize: number = 20;
  numberOfItems = 0;
  pokemonIndexToStart = this.currentPageIndex * this.pageSize + 1;

  //-- View Child --
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService) {

  }

  //-- Function --
  ngOnInit(): void {
    this.numberOfItems = MAX_POKEMON_COUNT;

    this.pokemonService.getPokemons().then((data) => {
      this.paginatedList = data;
      
      
      data.results.forEach((e, index=1) => {
        index+=1;
        this.pokeList.push(new Pokemon('' + index, e.name, e.url));
      });

    })
  }

  _pageEvent(event: PageEvent) {
    if(this.paginatedList) {
      if(event.pageIndex == this.currentPageIndex +1) {
        this.currentPageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.pokemonIndexToStart = this.pageSize * this.currentPageIndex + 1;
        this._getPokemonNextPage(); 
      }

      if(event.pageIndex == this.currentPageIndex -1) {
        this.currentPageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.pokemonIndexToStart = this.pageSize * this.currentPageIndex + 1;
        this._getPokemonPreviousPage(); 
      }
    }

    
    
  }

  _getPokemonNextPage() {
    this.pokemonService.getPokemonsNextPage(this.paginatedList?.next!).subscribe((data) => {
          
      this.paginatedList=data;

      this.pokeList = [];

      data.results.forEach((e, index=1) => {
        const pokemon = new Pokemon(this.pokemonIndexToStart+index+'', e.name, e.url);
        
        index+=1;

        this.pokeList.push(pokemon);
      })

    });
  }

  _getPokemonPreviousPage() {
    this.pokemonService.getPokemonsPreviousPage(this.paginatedList?.previous!).subscribe((data) => {
          
      this.paginatedList=data;

      this.pokeList = [];

      data.results.forEach((e, index=1) => {
        const pokemon = new Pokemon(this.pokemonIndexToStart+index+'', e.name, e.url);
        
        index+=1;

        this.pokeList.push(pokemon);
      })

    });
  }

}

  



