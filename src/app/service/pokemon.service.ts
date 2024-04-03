import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { PokemonDetail, PokeServiceRes } from '../type/type';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = "https://pokeapi.co/api/v2/pokemon";
  constructor(private http: HttpClient) { }

  getPokemons(): Promise<PokeServiceRes>
  {
    return firstValueFrom(this.http.get<PokeServiceRes>(this.url));
  }

  getPokemonsNextPage(nextPage: string): Observable<PokeServiceRes>
  {
    return this.http.get<PokeServiceRes>(nextPage);
  }

  getPokemonsPreviousPage(previousPage: string): Observable<PokeServiceRes>
  {
    return this.http.get<PokeServiceRes>(previousPage);
  }

  async getDetails(id: string | undefined): Promise<PokemonDetail> 
  {
    return firstValueFrom(this.http.get<PokemonDetail>(this.url + '/' + id));
  }

  
}
