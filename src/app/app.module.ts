import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card'
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokeListComponent } from './component/poke-list/poke-list.component';
import { PokemonComponent } from './component/pokemon/pokemon.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FirstLetterUpperCasePipe } from './pipe/first-letter-upper-case.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PokemonDetailsComponent } from './component/pokemon-details/pokemon-details.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PokemonNavigatorComponent } from './component/pokemon-navigator/pokemon-navigator.component';


@NgModule({
  declarations: [
    AppComponent,
    PokeListComponent,
    PokemonComponent,
    FirstLetterUpperCasePipe,
    PokemonDetailsComponent,
    PokemonNavigatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    NgFor,
    NgIf,
    FormsModule, 
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatCardModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatPaginatorModule,
    FirstLetterUpperCasePipe,
    MatTooltipModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
