import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EvolutionChain } from '../type/type';

@Injectable({
  providedIn: 'root'
})
export class EvolutionChainService {


  private url = "https://pokeapi.co/api/v2/evolution-chain/"
  constructor(private http: HttpClient) { }

  getEvolutionChain(id: string) : Promise<EvolutionChain>{
    return firstValueFrom(this.http.get<EvolutionChain>(id))
  }
}
