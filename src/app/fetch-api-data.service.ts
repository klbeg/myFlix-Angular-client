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
  //  Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

export class FetchApiDataService {
  constructor() {}
}
