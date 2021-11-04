import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  movies: object[] = [];
  favMovies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
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
        console.log(this.user);
        const movies = localStorage.getItem('movies');
        let favMovieObjects: object[] = [];
        if (typeof movies === 'string') {
          const parse = JSON.parse(movies);
          this.movies = parse;
          let favMovieObjs: object[] = [];
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

  log = (x: any) => {
    console.log(x);
  };

  onUpdateUserInfo = () => {
    const updateArr = Object.entries(this.userData);
    let filteredArr = updateArr.filter((item) => item[1].length);
    let filteredObj = Object.fromEntries(filteredArr);

    this.fetchApiData.editUserInfo(this.user.Username, filteredObj).subscribe(
      (result) => {
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
  onDeleteFav = (x: string): void => {
    let updateFavArr: string[] = [];
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
