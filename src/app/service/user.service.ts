import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publication } from '../domain/publication';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public mediaServiceUrl = environment.mediaService

  public userServiceUrl = environment.userService

  constructor(private httpClient: HttpClient) { }

  getUserPublications(): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.mediaServiceUrl}/users/publications`)
  }

  getSpecifiedUserPublications(username: string): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.mediaServiceUrl}/users/${username}/publications`)
  }

  updateUserImage(formData: FormData): Observable<User> {
    return this.httpClient.put<User>(`${this.userServiceUrl}/user/profile-image`, formData)
  }


}
