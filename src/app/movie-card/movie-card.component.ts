import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  token: string = '';
  userFavs: string[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (typeof user === 'string') {
      const parse = JSON.parse(user);
      this.user = parse;
    }
    this.fetchApiData
      .getUser(this.user.Username)
      .subscribe((response): void => {
        this.user = response;
        this.userFavs = this.user.FavoriteMovies;
      });

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
    const token: any = localStorage.getItem('token');
    this.token = token;
  }

  log = (x: any) => {
    console.log(x);
  };

  openGenreDialog(genre: object): void {
    this.dialog.open(GenreViewComponent, {
      data: genre,
    });
  }
  openDirectorDialog(director: object): void {
    console.log('openDirectorDialog: ', director);
    this.dialog.open(DirectorViewComponent, {
      data: director,
    });
  }
  openSynopsisDialog(movie: string): void {
    console.log('openSynopsisDialog: ', movie);
    this.dialog.open(SynopsisViewComponent, {
      data: movie,
    });
  }
  filterFavs = (x: string): boolean => {
    let result: boolean = false;
    this.userFavs.filter((movie): any => {
      movie === x ? (result = true) : '';
    });
    return result;
  };

  onAddFav = (x: string): void => {
    let updateFavArr: string[] = [];
    this.fetchApiData
      .addFavoriteMovie(this.user.Username, x)
      .subscribe((response) => {
        response.forEach((movie: any): any => {
          updateFavArr.push(movie._id);
        });
        this.userFavs = updateFavArr;
      });
    //  add snackbar "movie.Title has been added to your favorites"
  };
  onDeleteFav = (x: string): void => {
    let updateFavArr: string[] = [];
    this.fetchApiData
      .deleteFavoriteMovie(this.user.Username, x)
      .subscribe((response) => {
        response.forEach((movie: any): any => {
          updateFavArr.push(movie._id);
        });
        this.userFavs = updateFavArr;
        console.log(this.userFavs);
      });
  };
}
