import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OmdbapiMovie } from './omdbapimovie.interface';
import { Observable } from 'rxjs';

@Injectable()
export class OmdbapiService {
  apiURL = 'https://www.omdbapi.com/?apikey=5b3c2e6d';

  constructor(
    private http: HttpClient
  ) {}

  SearchMovies(value) {
    return this.http.get(this.apiURL + '&type=movie&s=' + value);
  }

  GetMovieByID(value) {
    return this.http.get(this.apiURL + '&i=' + value);
  }

//  ListMovies(): Observable<OmdbapiMovie[]> {
//    return this.http.get<OmdbapiMovie[]>(this.searchURL + '&s=star+trek');
//  }

}