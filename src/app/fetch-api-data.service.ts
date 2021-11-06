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

  /**
   * Takes user object from registration form, sends to API to create user
   * @param userDetails Full user object or user to create
   * @returns returns new user's user object
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Uses login form to log user in
   * @param Username Username entered into login form
   * @param Password Password entered into login form
   * @returns Full user object
   */
  public userLogin(Username: any, Password: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', { Username, Password })
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets full list of movies from backend
   * @returns All movies in DB
   */
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

  /**
   * Gets a movie by title
   * @param movieTitle Movie's title
   * @returns Full movie object of selected movie
   */
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

  /**
   * Uses Director of selected movie's name to get directors info
   * @param directorName
   * @returns Director's info
   */
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

  /**
   * Get's selected movie's genre by genre name
   * @param genreName
   * @returns Genre's details
   */
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
  /**
   * Get's user's full user object
   * @param username
   * @returns User's full user object
   */
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
  /*  Not currently used
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
  */
  /**
   * Finds user by username and adds selected movie to their favorites
   * using movie's ID
   * @param username
   * @param movieId
   * @returns
   */
  public addFavoriteMovie(username: any, movieId: any): Observable<any> {
    console.log(`username: ${username}  &  movieId: ${movieId}`);
    const token = localStorage.getItem('token');
    return this.http
      .put(
        apiUrl + `/users/${username}/movies/${movieId}`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Finds user by username and delete selected movie from their favorites
   * using movie's ID
   * @param username
   * @param movieId
   * @returns
   */
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
  /**
   * Finds user by username and updates whatever info they've updated via
   * the updateUser form
   * @param username
   * @param updateInfo Only contains fields user has chosen to update
   * @returns Full user object
   */
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
  /**
   * Finds user by username and updates user's password
   * @param username
   * @param newPassword
   * @returns Full user object
   */
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

  /**
   * Finds user by username and deletes profile
   * @param username
   * @returns returns message to confirm user has been deleted
   */
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

  /**
   * Takes response from  called method and returns response body
   * @param res
   * @returns
   */
  private extractResponseData(res: any | object): any {
    const body = res;
    return body || {};
  }
  /**
   * returns any errors that have occurred
   * @param error
   * @returns
   */
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
