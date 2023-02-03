import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetails } from '../models/login';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails = new LoginDetails();
  error: any = undefined;
  unSubscriber = new UnSubscriber();

  constructor(private authService: AuthService,
    private router: Router,
    private appService: AppService,
    private userService: UserService,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }

  login() {
    if(!this.validateForm()) return;
    console.log(this.loginDetails);

    this.unSubscriber.subs = this.authService.login(this.loginDetails).subscribe(data => {
      let token = data.jwt;
      localStorage.setItem("token", token);
      this.unSubscriber.subs = this.userService.getUser().subscribe(data => {
        this.appService.user = data.entity;
        this.toastService.openSnackBar('Login successful');
        this.router.navigate(['/']);
      });

    }, err => {
      this.toastService.openSnackBar('Error occurred!');
    })
  }

  validateForm() {
    this.error = undefined;
    if(this.loginDetails.username == undefined || this.loginDetails.username == '') {
      this.error = 'Invalid username';
      return false;
    }
    if(this.loginDetails.password == undefined || this.loginDetails.password == '') {
      this.error = 'Invalid password';
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }

}
