import { ApplicationConfig, NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { PokeListComponent } from './component/poke-list/poke-list.component';
import { PokemonDetailsComponent } from './component/pokemon-details/pokemon-details.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: PokeListComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), provideRouter(routes), provideClientHydration ()]
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
