import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService,private _router: Router) {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Veuillez entrer un e-mail';
    }
    return this.email.hasError('email') ? 'E-mail invalide' : '';
  }

  addProfil(){
    const profilToCreate : User = this.userForm.getRawValue() as User;
    this.userService.addUser(profilToCreate).then(a => {
      if (a)
        this._router.navigateByUrl('/accueil').then(console.log);
    });
  }
}
