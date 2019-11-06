import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/assets/movies.json');
  }

}
