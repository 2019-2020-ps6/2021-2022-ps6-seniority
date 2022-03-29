import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public user: User | undefined;

  constructor(private route: ActivatedRoute,
              private service: UserService) {
  }

  ngOnInit(): void {
    console.log(this.service.user);
    this.user = this.service.user;
  }
}

