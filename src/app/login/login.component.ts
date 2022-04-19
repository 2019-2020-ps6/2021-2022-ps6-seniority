import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  userForm: FormGroup;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter an email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(public formBuilder: FormBuilder,private userService : UserService,private snackBar : MatSnackBar,private _router : Router) {
    this.userForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  login() {
    const user = {
      name: '',
      ...this.userForm.getRawValue()
    } as User;
    this.userService.logIn(user).then(res => {
      if (res) {
        this._router.navigateByUrl('/accueil').then()
      } else {
        this.snackBar.open('Identifiants invalides !', 'OK', {
          duration : 3000
        })
      }
    });
  }

}
