import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { PokemonSpecies } from '../type/type';

@Injectable({
  providedIn: 'root'
})
export class PokemonSpeciesService {

  private url = "https://pokeapi.co/api/v2/pokemon-species";
  constructor(private http: HttpClient) { }

  getPokemonSpecies(id: string): Promise<PokemonSpecies>
  {
    return firstValueFrom(this.http.get<PokemonSpecies>(this.url + "/" + id));
  }
}
