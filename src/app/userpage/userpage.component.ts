import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Publication } from '../domain/publication';
import { User } from '../domain/user';
import { AuthenticationService } from '../service/authentication.service';
import { PublicationService } from '../service/publication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  public user!: User
  publications: Publication[] = []
  subscribtions: Subscription[] = []
  showLoading: boolean = false
  profileImage!: File

  constructor(private authentication: AuthenticationService, private userService: UserService,
    private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.user = this.authentication.getUserFromLocalCache()
    this.getPublications()
  }

  getPublications() {
    this.userService.getUserPublications()
    this.subscribtions.push(this.publicationService.getAllPublications().subscribe(
      (response: Publication[]) => {
        this.publications = response
        console.log(this.publications)
      },
      (errorResponse: HttpErrorResponse) => {
        console.log('Error happened')
        console.log(errorResponse)
      }
    ))
  }

  public onPublicationChoose(event: any): void {
    this.profileImage = event.target.files[0];
    console.log(this.profileImage)
  }

  editUserInfo(userForm: NgForm) {
    console.log(userForm.value)
    var formData = new FormData();
    formData.append('file', this.profileImage)
    this.subscribtions.push(this.userService.updateUserImage(formData).subscribe(
      (response: User) => {
        console.log(response)
        this.user = response;
        localStorage.setItem('user', JSON.stringify(this.user))
      },
      (errorResponse: HttpErrorResponse) => {
        console.log('Error happened')
        console.log(errorResponse)
      }
    ))
    this.close()
  }

  close() {
    document.getElementById('editUserInfoModal')!!.style.display = 'none'
    document.querySelector('body')!!.style.overflow = 'auto'
  }

  onEditUserInfo() {
    document.getElementById('editUserInfoModal')!!.style.display = 'flex'
    document.querySelector('body')!!.style.overflow = 'hidden'
  }


}
