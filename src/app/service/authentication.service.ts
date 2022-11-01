import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../domain/login';
import { User } from '../domain/user';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public apiUrl: string = environment.userService;

  private token?: string | null
  private jwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {
  }

  public login(login: LoginData): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(`${this.apiUrl}/user/login`, login, { observe: 'response' })
  }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/user/register`, user)
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('username', user.username)
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    var user = localStorage.getItem('user')
    return user != null ? JSON.parse(user) : null
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token')
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelperService.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelperService.isTokenExpired(this.token)) {
          return true
        }
      }
    }
    this.logout();
    return false;
  }

}
