import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { OmdbapiService } from '../omdbapi.service';
import { Movie } from '../movie.interface';
import { MoviesService } from '../movies.service';
import { formatDate } from '@angular/common';

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
        switchMap(value => this.omdbapiService.SearchMovies(value)
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

  OnMovieSelected(imdbID: string) {
    this.showResult = true;

    this.omdbapiService.GetMovieByID(imdbID)
      .subscribe(data => {
        this.newMovie.Title = data["Title"];
        this.newMovie.Year = data["Year"];
        this.newMovie.Director = data["Director"];
        this.newMovie.Type = data["Type"];
        this.newMovie.Genre = data["Genre"];
        this.newMovie.Plot = data["Plot"];
        this.newMovie.Poster = data["Poster"];
        this.newMovie.Rated = data["Rated"];
        this.newMovie.Runtime = data["Runtime"];
        this.newMovie.imdbID = imdbID;
        this.newMovie.fileLocation = '';
        this.newMovie.homeDateAdded = formatDate(new Date(), 'yyyy/MM/dd', 'en');
      });

  }

  OnMovieAdd() {
    this.movieService.addMovie(this.newMovie).subscribe();
    this.showResult = false;
  }
}

