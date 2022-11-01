import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publication } from '../domain/publication';

@Injectable({
    providedIn: 'root'
})
export class PublicationService {

    public apiUrl = environment.mediaService

    constructor(private httpClient: HttpClient) { }

    getAllPublications(): Observable<Publication[]> {
        return this.httpClient.get<Publication[]>(`${this.apiUrl}/publications`)
    }

    postPublication(formData: FormData): Observable<Publication> {
        return this.httpClient.post<Publication>(`${this.apiUrl}/publications`, formData)
    }

}
