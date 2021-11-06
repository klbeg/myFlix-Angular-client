import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialog: MatDialog,
    public snackBar: MatSnackBar
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
        console.log('userFavs set');
      });

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      localStorage.setItem('movies', JSON.stringify(resp));
    });

    const token: any = localStorage.getItem('token');
    this.token = token;
  }

  log = (x: any) => {
    console.log(x);
  };

  /**
   * Takes movie's genre and displays details in modal
   * @param genre contains Name and Description
   */
  openGenreDialog(genre: object): void {
    this.dialog.open(GenreViewComponent, {
      data: genre,
    });
  }
  /**
   * Takes a movie's director and displays details in modal
   * @param director contains name, bio, birth year and death year
   */
  openDirectorDialog(director: object): void {
    console.log('openDirectorDialog: ', director);
    this.dialog.open(DirectorViewComponent, {
      data: director,
    });
  }
  /**
   * Displays a description of the selected movie in modal
   * @param movie Full movie object
   */
  openSynopsisDialog(movie: string): void {
    console.log('openSynopsisDialog: ', movie);
    this.dialog.open(SynopsisViewComponent, {
      data: movie,
    });
  }
  /**
   * Used to determine wether a movie has been favorited by user
   * @param x The selected movie's ID
   * @returns Boolean.  True === user has favorited selected movie
   */
  filterFavs = (x: string): boolean => {
    let result: boolean = false;
    this.userFavs.filter((movie): any => {
      movie === x ? (result = true) : '';
    });
    return result;
  };
  /**
   * Adds selected movie to user's list of favorites
   * displays success message in snackbar
   * @param x Selected movie's ID
   */
  onAddFav = (x: string): void => {
    let updateFavArr: string[] = [];
    this.fetchApiData.addFavoriteMovie(this.user.Username, x).subscribe(
      (response) => {
        response.forEach((movie: any): any => {
          updateFavArr.push(movie._id);
        });
        this.userFavs = updateFavArr;
        this.snackBar.open('Your movie has been added to favorites!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  };
  /**
   * Delete's selected movie from user's favorites
   * displays success message in snackbar
   * @param x Selected movie's ID
   */
  onDeleteFav = (x: string): void => {
    let updateFavArr: string[] = [];
    this.fetchApiData.deleteFavoriteMovie(this.user.Username, x).subscribe(
      (response) => {
        response.forEach((movie: any): any => {
          updateFavArr.push(movie._id);
        });
        this.userFavs = updateFavArr;
        this.snackBar.open(
          'A movie has been removed from your favorites!',
          'OK'
        );
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  };
}
