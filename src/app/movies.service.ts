import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.interface';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  //getMoviesURL = 'https://110.174.232.153:1880/test1';
  //postMoviesURL = 'https://110.174.232.153:1880/test11';
  getMoviesURL = '/assets/movies.json';
  postMoviesURL = 'https://webhook.site/f9e2fe00-de45-40cd-bdb2-e8e6c4770f6c';

  constructor(
    private http: HttpClient
  ) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.getMoviesURL);
  }

  addMovie (movie: Movie): Observable<any> {
    return this.http.post(this.postMoviesURL, movie, httpOptions).pipe();
  }

}
