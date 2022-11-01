import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from '../domain/author';
import { Publication } from '../domain/publication';
import { Topic } from '../domain/topic';
import { User } from '../domain/user';
import { PublicationService } from '../service/publication.service';
import { TopicService } from '../service/topic.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  publications: Publication[] = []
  subscribtions: Subscription[] = []
  topics: Topic[] = []
  author = new Author()
  user = new User()

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.getPublications()
    this.user = JSON.parse(localStorage.getItem('user')!)
  }

  getPublications() {
    this.subscribtions.push(this.publicationService.getAllPublications().subscribe(
      (response: Publication[]) => {
        this.publications = response
        console.log(this.publications)
        console.log(this.publications[0].author)
        console.log(this.author)
        this.author = response[0].author
        console.log(this.author)
      },
      (errorResponse: HttpErrorResponse) => {
        console.log('Error happened')
        console.log(errorResponse)
      }
    ))
  }



}
