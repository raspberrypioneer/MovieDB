import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MoviesService } from './movies.service';

//Material imports
import { 
  MatAutocompleteModule,
  MatExpansionModule, 
  MatButtonModule,
  MatPaginatorModule
} from '@angular/material';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatButtonModule,
    MatPaginatorModule,
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
  providers: [ MoviesService ]
})
export class AppModule { }
