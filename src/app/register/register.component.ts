import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppService } from '../services/app.service';
import { ToastService } from '../services/toast.service';
import { UnSubscriber } from '../utils/unsubscriber';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  isEdit = false;
  unSubscriber = new UnSubscriber();

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private toastService: ToastService,
    private _location: Location) { }

  ngOnInit(): void {
    console.log("RRR");

    this.unSubscriber.subs = this.route.queryParamMap.subscribe((params) => {
      let param = params.get('edit');
      this.isEdit = param ? Boolean(param) : false;
      if(this.isEdit) {
        this.user = this.appService.user;
        this.user.repeatPassword = this.user.password;
      }
      console.log(this.isEdit);
    });
  }

  saveUser() {
    if(!this.validateUser()) return;

    if(this.isEdit) {
      this.updateUser();
    }
    else {
      this.addUser();
    }
  }

  updateUser() {
    this.unSubscriber.subs = this.userService.updateUser(this.user).subscribe(data => {
      if(data.statusCode === 200) {
        this.toastService.openSnackBar('User updated successfully');
        this.appService.user = data.entity as User;
        this.goBack();
      }
      else {
        this.toastService.openSnackBar(data.message);
      }
    }, error => {
      this.toastService.openSnackBar('Error occurred!');
    });
  }

  addUser() {
    this.unSubscriber.subs = this.userService.addUser(this.user).subscribe(data => {
      if(data.statusCode === 200) {
        this.toastService.openSnackBar('Registration successfully');
        this.router.navigate(['login']);
      }
      else {
        this.toastService.openSnackBar(data.message);
      }
    }, error => {
      this.toastService.openSnackBar('Error occurred!');
    });
  }

  validateUser() {
    if(this.user.name == undefined || this.user.name == '') {
      this.toastService.openSnackBar('Please enter name');
      return false;
    }
    else if(this.user.email == undefined || this.user.email == '') {
      this.toastService.openSnackBar('Please enter email');
      return false;
    }
    else if(this.user.password == undefined || this.user.password == '') {
      this.toastService.openSnackBar('Please enter password');
      return false;
    }
    else if(this.user.repeatPassword == undefined || this.user.repeatPassword == '') {
      this.toastService.openSnackBar('Please enter password again');
      return false;
    }
    if(this.user.password !== this.user.repeatPassword) {
      this.toastService.openSnackBar('Password mismatch');
      return false;
    }
    return true;
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }
}
