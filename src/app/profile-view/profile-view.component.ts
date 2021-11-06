import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../movie';
import { User } from '../user';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  @Input() userData = {
    Name: '',
    Username: '',
    Email: '',
    Birthdate: '',
  };
  @Input() updatePass = {
    Password: '',
  };

  user: any = {};
  token: string = '';
  movies: Movie[] = [];
  favMovies: Movie[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar
  ) {}
  /**
   * Get's username from localstorage, then get's user from backend
   * creates full movie objects for favorite movies
   * set's user info to "this.user" and favs to "favMovies"
   */
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (typeof user === 'string') {
      const parse: User = JSON.parse(user);
      this.user = parse;
      console.log(this.user);
    }
    this.fetchApiData
      .getUser(this.user.Username)
      .subscribe((response: User): void => {
        this.user = response;
        console.log(this.user);
        const movies = localStorage.getItem('movies');
        let favMovieObjects: Movie[] = [];
        if (typeof movies === 'string') {
          const parse = JSON.parse(movies);
          this.movies = parse;
          let favMovieObjs: Movie[] = [];
          this.movies.filter((movie: any) => {
            if (this.user.FavoriteMovies.includes(movie._id)) {
              favMovieObjects.push(movie);
            }
          });
          this.favMovies = favMovieObjects;
        }
      });

    const token: any = localStorage.getItem('token');
    this.token = token;
  }
  /**
   * Filters out any inputs that have been left blank and
   * sents put request to change updated info in DB
   * displays success message as snackbar
   */
  onUpdateUserInfo = () => {
    const updateArr = Object.entries(this.userData);
    let filteredArr = updateArr.filter((item) => item[1].length);
    let filteredObj = Object.fromEntries(filteredArr);

    this.fetchApiData.editUserInfo(this.user.Username, filteredObj).subscribe(
      (result: User) => {
        this.user = result;

        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('User info updated successfully!', 'OK', {
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
   *  updates user password and displays success message as snackbar
   */
  onUpdatePassword = () => {
    let pass: object = { Password: this.updatePass.Password };

    this.fetchApiData.updatePassword(this.user.Username, pass).subscribe(
      () => {
        this.snackBar.open('Password updated successfully!', 'OK', {
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
   *  Deletes the user's account, displays success message as snackbar
   */
  onDeleteUser = () => {
    this.fetchApiData.deleteUser(this.user.Username).subscribe(
      () => {
        this.snackBar.open(
          'User account deleted.  Sorry to see you go :(',
          'OK',
          { duration: 2000 }
        );
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  };

  /**
   * Takes ID of selected movie and deletes it
   * from user's favorites
   * displays success message as snackbar
   * @param x movie ID used find movie to delete
   */
  onDeleteFav = (x: string): void => {
    let updateFavArr: Movie[] = [];
    this.fetchApiData.deleteFavoriteMovie(this.user.Username, x).subscribe(
      (response) => {
        response.forEach((movie: any): any => {
          updateFavArr.push(movie);
          console.log('response: ', response);
        });
        this.favMovies = updateFavArr;
        console.log(this.favMovies);
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
