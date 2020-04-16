import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OmdbapiMovie } from './omdbapimovie.interface';
import { Observable } from 'rxjs';

@Injectable()
export class OmdbapiService {

  constructor(
    private http: HttpClient
  ) {}

  getOmdbapiMovies(value) {
    return this.http.get('https://www.omdbapi.com/?apikey=5b3c2e6d&type=movie&s=' + value);
  }

  getOmdbapiList(): Observable<OmdbapiMovie[]> {
    return this.http.get<OmdbapiMovie[]>('http://www.omdbapi.com/?apikey=5b3c2e6d&s=star+trek');
  }

}