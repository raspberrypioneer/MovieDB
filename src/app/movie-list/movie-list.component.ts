import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie.interface';
import { MoviesService } from '../movies.service';
//import { OmdbapiMovie } from '../omdbapimovie.interface';
//import { OmdbapiService } from '../omdbapi.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  providers: [MoviesService],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];

  posterPath = "https://github.com/raspberrypioneer/MovieDB/blob/master/src/assets/posters/";

  constructor(
    private moviesService: MoviesService,
    //private omdbapiService: OmdbapiService
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movies = [];
    this.moviesService.getMovies()
      .subscribe(movies => (this.movies = movies));
//    this.omdbapiService.getAPISearchMovies()
//      .subscribe(data => {
//        if (data['Search'] == undefined) {
//          this.movies = [];
//        } else {
//          this.movies = data['Search'];
//        }
//      });
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
