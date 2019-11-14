import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MoviesService } from './movies.service';
import 'hammerjs';

//Material imports
import { 
  MatAutocompleteModule,
  MatExpansionModule, 
  MatButtonModule,
  MatPaginatorModule,
  MatInputModule,
  MatCardModule
} from '@angular/material';
import { OmdbapiService } from './omdbapi.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: '', component: MovieListComponent },
      { path: 'movie-add', component: MovieAddComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    MovieListComponent,
    MovieAddComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [ MoviesService, OmdbapiService ]
})
export class AppModule { }
