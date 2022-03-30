import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ajout-senior',
  templateUrl: './ajout-senior.component.html',
  styleUrls: ['./ajout-senior.component.css']
})
export class AjoutSeniorComponent implements OnInit {
  seniorform : FormGroup;

  constructor(public formBuilder: FormBuilder) { this.seniorform = this.formBuilder.group({
    name: [''],
    email: [''],
    password: ['']
  });}

  ngOnInit(): void {
  }

  addProfilPatient() {

  }
}
