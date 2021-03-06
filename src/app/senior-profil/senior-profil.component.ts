import { Component, OnInit } from '@angular/core';
import {Senior} from "../models/senior.model";
import {UserService} from "../services/user.service";
import {Configuration, Handicap} from "../models/handicap.model";
import {Router} from "@angular/router";
import {Stats} from "../models/stats.model";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-senior-profil',
  templateUrl: './senior-profil.component.html',
  styleUrls: ['./senior-profil.component.css']
})
export class SeniorProfilComponent implements OnInit {

  senior ?: Senior;
  handicapName : string = "";
  handicapsConfig ?: Handicap<any>[];
  selectedConfig ?: Handicap<any>;
  stats ?: Stats;

  constructor(private userService : UserService, private _router : Router) {
    this.userService.senior$.subscribe(next => {
      this.senior = next;
      this.userService.getStatsSeniors().then(stats => {
        this.stats = stats;
      });
      this.userService.getAllHandicapsConfigs().then();
    });
    this.userService.handicaps$.subscribe(next => {
      this.handicapsConfig = next;
      this.handicapName = this.userService.getHandicapName();
    });
    this.userService.userSelectedConfig$.subscribe(next => {
      this.selectedConfig = next.get(this.senior?.id);
    });
  }

  ngOnInit(): void {
  }

  get age() {
    if (!this.senior)
      return "0";
    let ageDifMs = Date.now() - new Date(this.senior.birthdate).getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  update(conf : Handicap<any>) {
    this.userService.changeHandicap(conf);
    const componentIdentifier = (conf.config as Configuration).type;
    const url = `/configuration/edit/${componentIdentifier.toLowerCase()}`;
    this._router.navigateByUrl(url).then();
  }

}
