import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { OmdbapiService } from '../omdbapi.service';
import { Movie } from '../movie.interface';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg: string;
  showResult;
  newMovie: Movie = { MovieId: ''
                    , Title: ''
                    , Year: ''
                    , Director: ''
                    , Actors: ''
                    , Type: ''
                    , Genre: ''
                    , Plot: ''
                    , Poster: ''
                    , Rated: ''
                    , Runtime: ''
                    , imdbID: ''
                    , fileLocation: ''
                    , homeDateAdded: ''};

  constructor(
    private http: HttpClient,
    private omdbapiService: OmdbapiService,
    private movieService: MoviesService,
  ) {
      this.showResult = false;
   }

  ngOnInit() {
    this.searchMoviesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        switchMap(value => this.omdbapiService.getAPISearchMovies(value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {
        if (data['Search'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredMovies = [];
        } else {
          this.errorMsg = "";
          this.filteredMovies = data['Search'];
        }
      });
  }

  OnMovieSelected(option: MatOption) {
    this.showResult = true;
    this.newMovie.imdbID = option.imdbID;
    this.newMovie.Title = option.Title;
    this.newMovie.Year = option.Year;
    this.newMovie.Type = option.Type;
    this.newMovie.Poster = option.Poster;
  }

  OnMovieAdd() {
    this.movieService.addMovie(this.newMovie);
    this.showResult = false;
  }
}

