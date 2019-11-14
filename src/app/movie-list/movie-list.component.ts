import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie.interface';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  providers: [MoviesService],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  omdbapiMovies;
  posterPath = "https://github.com/raspberrypioneer/MovieDB/blob/master/src/assets/posters/";

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movies = [];
    this.moviesService.getMovies()
      .subscribe(movies => (this.movies = movies));
  }

  //Pagination
  pageIndex:number = 0;
  pageSize:number = 4;
  lowValue:number = 0;
  highValue:number = 4;      

  getPaginatorData(event){
     if(event.pageIndex === this.pageIndex + 1){
        this.lowValue = this.lowValue + this.pageSize;
        this.highValue =  this.highValue + this.pageSize;
       }
    else if(event.pageIndex === this.pageIndex - 1){
       this.lowValue = this.lowValue - this.pageSize;
       this.highValue =  this.highValue - this.pageSize;
      }   
       this.pageIndex = event.pageIndex;
 }

}
