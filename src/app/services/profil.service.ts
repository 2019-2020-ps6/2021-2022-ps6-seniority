import { Injectable } from '@angular/core';
import {Profil} from "../models/profil.model";
import {PROFIL_LIST} from "../mocks/profil-list.mock";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private profils: Profil[] = PROFIL_LIST;
  public profils$: BehaviorSubject<Profil[]> = new BehaviorSubject(PROFIL_LIST);


  constructor() {
  }

  getProfilFromId(id : string | null) : Profil | undefined{
    return this.profils.find(profil => profil.id === id);
  }

  addProfil(profil: Profil){
    this.profils.push(profil);
    this.profils$.next(this.profils);
  }
}
