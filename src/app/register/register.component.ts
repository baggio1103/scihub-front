import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../domain/user';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public showLoading: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }


  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management')
    }
  }

  public onRegister(user: User): void {
    this.showLoading = true;
    console.log(user.username)
    this.authenticationService.register(user).subscribe(
      (response: User) => {
        // this.notificationService.notify(NotificationType.SUCCESS, `A new account has been created for ${response.username}`)
        this.showLoading = false;
        this.router.navigateByUrl('/login')
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse)
        this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message)
        this.showLoading = false;
      }
    )
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      // this.notificationService.notify(notificationType, message)
    } else {
      // this.notificationService.notify(notificationType, 'An error occured. Please try again!')
    }
  }


  ngOnDestroy(): void {
    console.log('')
  }


}
