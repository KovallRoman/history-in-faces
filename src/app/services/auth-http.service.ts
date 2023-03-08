import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SigUpModel } from '../models/user/sig-up.model';
import { LogInModel } from '../models/user/log-in.model';
import { UpdateMyselfModel } from '../models/user/update-myself.model';
import { UserResponseModel } from '../models/user/user-response.model';


@Injectable({providedIn: 'root'})
export class AuthHttpService {
  token?: string = localStorage.getItem('accessToken');

  constructor(
    private http: HttpClient
  ) {
  }

  signUpUser(user: SigUpModel): Observable<UserResponseModel> {
    return this.http.post<UserResponseModel>('http://localhost:8000/api/auth/signup', user);
  }

  logInUser(user: LogInModel): Observable<UserResponseModel> {
    return this.http.post<UserResponseModel>('http://localhost:8000/api/auth/login', user).pipe(
      tap((user) => {
        this.token = user.accessToken;
        localStorage.setItem('accessToken', user.accessToken);
      })
    );
  }

  logoutUser(): void {
    this.token = null;
    localStorage.removeItem('accessToken');
  }

  editUser(id: string, user: UpdateMyselfModel): Observable<UserResponseModel> {
    return this.http.put<UserResponseModel>('http://localhost:8000/api/users/myself', user);
  }

  getUserSelf(): Observable<UserResponseModel> {
    return this.http.get<UserResponseModel>('http://localhost:8000/api/users/myself')
  }
}
