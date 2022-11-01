import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Topic } from '../domain/topic';

@Injectable({
    providedIn: 'root'
})
export class TopicService {

    public apiUrl = environment.mediaService

    constructor(private httpClient: HttpClient) {

    }

    getTopics(): Observable<Topic[]> {
        return this.httpClient.get<Topic[]>(`${this.apiUrl}/topics`)
    }

}
