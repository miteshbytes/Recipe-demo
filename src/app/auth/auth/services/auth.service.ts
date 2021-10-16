import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

export interface AuthResponse {
  idToken      : string;
  email        : string;
  refreshToken : string;
  expiresIn    : string;
  localId      : string;
  registered  ?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  // Sing Up new user
  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.apiKey, 
    {
      email             : email,
      password          : password,
      returnSecureToken : true
    })
    .pipe(catchError(this.errorHandler), tap(responseData => {
      this.handleAuthentication(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            );
    }));
  }

  // Login User
  login(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.apiKey,
    {
      email             : email,
      password          : password,
      returnSecureToken : true
    })
    .pipe(catchError(this.errorHandler), tap(responseData => {
      this.handleAuthentication(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            );
    }));
  }

  // Handle Authentication After API called Successfull response
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000); // seconds to miliseconds

    const user = new User(
                  email,
                  userId,
                  token,
                  expirationDate
                );

    this.user.next(user);
  }

  // make single Error Handler for multipe Api Response
  private errorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.!!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch(errorResponse.error.error.message) { 
      case 'EMAIL_EXISTS': { 
        errorMessage = 'This email already exists.!!';
        break;
      }
      case 'EMAIL_NOT_FOUND': { 
        errorMessage = 'This email does\'nt found.!!';
        break;
      }
      case 'INVALID_PASSWORD': { 
        errorMessage = 'The password is not correct.!!';
        break;
      } 
    }

    return throwError(errorMessage);    //Rethrow it back to component
 }

}

// Firebase API Reference : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

// Recipe : https://recipe-demo-f7230-default-rtdb.firebaseio.com/recipes.json  on Shared folder DataStorageService.

// {
//   "rules": {
//     ".read": "now < 1625250600000",  // 2021-7-3
//     ".write": "now < 1625250600000",  // 2021-7-3
//   }
// }


// {
//   "rules": {
//     ".read": "auth != null",  // 2021-10-15
//     ".write": "auth != null",  // 2021-10-15
//   }
// }
