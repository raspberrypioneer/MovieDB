import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OmdbapiMovie } from './omdbapimovie.interface';
import { Observable } from 'rxjs';

@Injectable()
export class OmdbapiService {
  rootURL = 'https://www.omdbapi.com/?apikey=5b3c2e6d';

  constructor(
    private http: HttpClient
  ) {}

  getAPISearchMovies(value) {
    return this.http.get(this.rootURL + '&type=movie&s=' + value);
  }

//  getAPIListMovies(): Observable<OmdbapiMovie[]> {
//    return this.http.get<OmdbapiMovie[]>(this.rootURL + '&s=star+trek');
//  }

}