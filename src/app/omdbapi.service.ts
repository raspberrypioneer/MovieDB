import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OmdbapiService {

  constructor(
    private http: HttpClient
  ) {}

  getOmdbapiMovies(value) {
    return this.http.get('https://www.omdbapi.com/?apikey=5b3c2e6d&type=movie&s=' + value);
  }

}