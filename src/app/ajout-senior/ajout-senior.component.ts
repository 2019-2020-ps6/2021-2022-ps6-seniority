import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-ajout-senior',
  templateUrl: './ajout-senior.component.html',
  styleUrls: ['./ajout-senior.component.css']
})
export class AjoutSeniorComponent implements OnInit {
  seniorform : FormGroup;
  public user: User | undefined;


  constructor(private service: UserService,
              public formBuilder: FormBuilder) {
    this.seniorform = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      dateNaissance: [''],
      handicap: ['']
    });
  }

  ngOnInit(): void {
    this.user = this.service.user;
  }

  addProfilPatient() {

  }
}
