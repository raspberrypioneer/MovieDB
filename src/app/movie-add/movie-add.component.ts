import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { OmdbapiService } from '../omdbapi.service';

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
  resultImdbId = "";
  resultTitle = "";
  resultType = "";
  resultPoster = "";
  resultYear = "";

  constructor(
    private http: HttpClient,
    private omdbapiService: OmdbapiService
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
        switchMap(value => this.omdbapiService.getOmdbapiMovies(value)
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
    this.resultImdbId = option.imdbID;
    this.resultTitle = option.Title;
    this.resultYear = option.Year;
    this.resultType = option.Type;
    this.resultPoster = option.Poster;
  }

  OnMovieAdd() {
    this.showResult = false;
  }
}

