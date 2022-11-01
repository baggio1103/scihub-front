import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Publication } from '../domain/publication';
import { Topic } from '../domain/topic';
import { User } from '../domain/user';
import { PublicationService } from '../service/publication.service';
import { TopicService } from '../service/topic.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  publications: Publication[] = []
  tempPublications: Publication[] = []
  subscribtions: Subscription[] = []
  topics: Topic[] = []
  user: User = new User()
  publication!: File
  showLoading = false
  constructor(private userService: UserService,
    private topicService: TopicService,
    private publicationService: PublicationService) {
  }

  ngOnInit(): void {
    this.getPublications()
    this.getTopics()
  }

  getPublications() {
    this.subscribtions.push(this.publicationService.getAllPublications().subscribe(
      (response: Publication[]) => {
        this.publications = response
        this.user = JSON.parse(localStorage.getItem('user')!)
      },
      (errorResponse: HttpErrorResponse) => {
        console.log('Error happened in getPublications')
        console.log(errorResponse)
      }
    ))
    // this.subscribtions.push(this.userService.getUserPublications().subscribe(
    //   (response: Publication[]) => {
    //     this.publications = response
    //     this.user = JSON.parse(localStorage.getItem('user')!)
    //   },
    //   (errorResponse: HttpErrorResponse) => {
    //     console.log('Error happened')
    //     console.log(errorResponse)
    //   }
    // ))
    this.user = JSON.parse(localStorage.getItem('user')!)

  }

  getTopics() {
    this.subscribtions.push(this.topicService.getTopics().subscribe(
      (response: Topic[]) => {
        this.topics = response
      },
      (errorResponse: HttpErrorResponse) => {
        console.log('Error happened in getTopics')
        console.log(errorResponse)
      }
    )
    )
    console.log(this.user)
  }

  onAddPost() {
    document.getElementById('addModal')!!.style.display = 'flex'
    document.querySelector('body')!!.style.overflow = 'hidden'
  }

  post(postForm: NgForm) {
    this.showLoading = true
    const formData = this.createFormData(postForm.value)
    this.subscribtions.push(this.publicationService.postPublication(formData).subscribe(
      (response: Publication) => {
        console.log('Publication added')
        console.log(response)
      }, (errorResponse: HttpErrorResponse) => {
        console.log('Error happened')
        console.log(errorResponse)
      }
    ))
    postForm.resetForm()
    this.close()
    this.showLoading = false
  }

  close() {
    document.getElementById('addModal')!!.style.display = 'none'
    document.querySelector('body')!!.style.overflow = 'auto'
  }

  onFilter(topic: String) {
    this.tempPublications = this.publications.filter(publication => {
      return publication.topics?.some(t => t.name == topic)
    })
    if (this.tempPublications.length !== 0) {
      this.publications = this.tempPublications
    }
  }

  onResetFilter() {
    this.getPublications()
  }

  public onPublicationChoose(event: any): void {
    this.publication = event.target.files[0];
  }

  createFormData(publication: Publication): FormData {
    console.log(publication.tags.split(' ,'))
    var formData = new FormData();
    formData.append('title', publication.title);
    formData.append('description', publication.description);
    formData.append('isPublic', JSON.stringify(publication.isPublic));
    formData.append('file', this.publication);
    formData.append('publicationType', publication.publicationType);
    formData.append('topics', publication.tags)
    return formData;
  }

}

