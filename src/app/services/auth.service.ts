import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(sessionStorage.getItem('user') || 'null')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  public getToken(): string | null {
    return JSON.parse(sessionStorage.getItem('token') || 'null');
  }

  /*=======================================================
                     Login User
  =======================================================*/

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        map((user) => {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }),
        catchError((error) => {
          console.error('Login error:', error.error.error);
          return throwError(error.error.error);
        })
      );
  }

  /*=======================================================
                     Logout User
  =======================================================*/

  logout() {
    // Remove user from local session to log the user out
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
