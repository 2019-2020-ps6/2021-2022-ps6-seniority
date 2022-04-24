import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Senior} from "../models/senior.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil-creation-senior',
  templateUrl: './profil-creation-senior.component.html',
  styleUrls: ['./profil-creation-senior.component.css']
})
export class ProfilCreationSeniorComponent implements OnInit {

  handicaps: string[];
  handicapForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder,private _router : Router) {
    this.handicaps = [];
    this.handicapForm = this.formBuilder.group({
      surname: [''],
      name: [''],
      birthdate: [new Date()],
      handicap: ['']
    });
    this.userService.allHandicaps$.subscribe(next => {
      this.handicaps = next;
    });
    this.userService.getHandicaps().then();
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.userService.user) return;
    const new_senior: Senior = {
      birthdate: <string>this.handicapForm.controls["birthdate"].value,
      name: this.handicapForm.controls["name"].value,
      surname: this.handicapForm.controls["surname"].value,
      userId: parseInt(<string>this.userService.user.id)
    }
    this.userService.addNewSenior(new_senior,this.handicapForm.controls["handicap"].value).then(res => {
      if (res)
        this._router.navigateByUrl("/profil").then();
    });
  }

}
