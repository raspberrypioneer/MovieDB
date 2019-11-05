import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies;
  posterPath = "https://github.com/raspberrypioneer/MovieDB/blob/master/src/assets/posters/";

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.movies = this.moviesService.getMovies();
  }

}
