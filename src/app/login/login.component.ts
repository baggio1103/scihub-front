import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginData } from '../domain/login';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../domain/user';
import { HeaderType } from '../enum/header-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showLoading: boolean = false

  private subscribtions: Subscription[] = [];


  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  public onLogin(loginData: LoginData): void {
    this.showLoading = true;
    console.log(loginData)
    this.subscribtions.push(
      this.authenticationService.login(loginData).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token!);
          this.authenticationService.addUserToLocalCache(response.body!)
          this.showLoading = false
          this.router.navigateByUrl('/stream')
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse)
          console.log(errorResponse.error.message)
          this.showLoading = false
        }
      )
    )
  }

  sendErrorNotification(ERROR: any, message: any) {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
  }

}
