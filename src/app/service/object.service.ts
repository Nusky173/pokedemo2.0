import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../type/type';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  private url = "https://pokeapi.co/api/v2/item";
  constructor(private http: HttpClient) { }


  get(id: string) : Promise<Item>
  {
    return firstValueFrom(this.http.get<Item>(this.url + "/" + id));
  }
}
