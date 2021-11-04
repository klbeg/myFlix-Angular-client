import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//  potentially move to a config file for later?
const apiUrl = 'https://kb-movie-api.herokuapp.com'; //  heroku url for backend

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  //  Injects HttpClient module to the constructor params
  //  provides HttpClient to the entire class, making it available as
  //  this.http
  constructor(private http: HttpClient) {}

  //  user registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //  user login
  public userLogin(Username: any, Password: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', { Username, Password })
      .pipe(catchError(this.handleError));
  }

  //  get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        //  no compliation error, but pretty sure this is still wrong
        //  original code was -- map(this.extractResponseData), --
        //  is map the same as Array.prototype.map() ??
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //  get single movie by title
  public getMovieByTitle(movieTitle: any): Observable<any> {
    console.log(movieTitle);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/movies/${movieTitle}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  get director info
  public getDirector(directorName: any): Observable<any> {
    console.log(directorName);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  get movie genre
  public getGenre(genreName: any): Observable<any> {
    console.log(genreName);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/genres/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  get user by username
  public getUser(username: any): Observable<any> {
    console.log(username);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //
  //
  //
  //  Need to build an endpoint for get user's favorite movies
  //  currently favorites aren't handled separately from user
  //
  //
  //
  public getFavoriteMovies(username: any): Observable<any> {
    console.log(username);
    const token = localStorage.getItem('token');
    return (
      this.http
        //  user this endpoint on backend
        .get(apiUrl + `/users/getFavoriteMovies/${username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError))
    );
  }

  //  add movie to user's favorites
  public addFavoriteMovie(username: any, movieId: any): Observable<any> {
    console.log(`username: ${username}  &  movieId: ${movieId}`);
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `/users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  delete movie from user's favorites
  public deleteFavoriteMovie(username: any, movieId: any): Observable<any> {
    console.log(`username: ${username}  &  movieId: ${movieId}`);
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `/users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  edit user's info ** DOES NOT INCLUDE PASSWORD
  public editUserInfo(username: string, updateInfo: object): Observable<any> {
    console.log(`username: ${username}  &  updateInfo: ${updateInfo}`);
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `/users/${username}`, updateInfo, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  update user's password
  public updatePassword(
    username: string,
    newPassword: object
  ): Observable<any> {
    console.log(`username: ${username} &  newPassword: ${newPassword}`);
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `/users/${username}/changePass`, newPassword, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  delete user's account
  public deleteUser(username: any): Observable<any> {
    console.log(username);
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any | object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}.  Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

export class FetchApiDataService {
  constructor() {}
}
