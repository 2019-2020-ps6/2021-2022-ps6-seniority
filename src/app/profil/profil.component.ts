import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {Senior} from "../models/senior.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public user: User | undefined;
  public seniors : Senior[];

  constructor(private route: ActivatedRoute,
              private service: UserService,
              private _router : Router,
              private matSnackBar : MatSnackBar) {
    this.seniors = [];
    this.service.user$.subscribe(next => {
      this.user = next;
    });
    this.service.seniors$.subscribe(next => {
      this.seniors = next;
    })
  }

  ngOnInit(): void {
  }

  chooseSenior(senior : Senior) {
    this.service.changeSenior(senior);
    this._router.navigateByUrl("/profil/senior/profil").then();
  }

  logout() {
    this.service.logout();
    this._router.navigateByUrl("/").then();
  }

  deleteSenior(senior : Senior,event : Event) {
    event.stopPropagation();
    this.service.removeSenior(senior).then(res => {
      if (res)
        this.matSnackBar.open("Le senior à bien été retiré" , 'OK', {
          duration : 3000
        });
    })
  }

}

