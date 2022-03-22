import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Profil} from "../models/profil.model";
import {ProfilService} from "../services/profil.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public profil : Profil | undefined;

  constructor(private route: ActivatedRoute,
              private service: ProfilService) { }

  ngOnInit(): void {
    this.getProfil();
  }

  getProfil(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.profil = this.service.getProfilFromId(id);
  }
}
