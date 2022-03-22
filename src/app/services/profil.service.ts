import { Injectable } from '@angular/core';
import {Profil} from "../models/profil.model";
import {PROFIL_LIST} from "../mocks/profil-list.mock";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private profils: Profil[] = PROFIL_LIST;

  constructor() {
  }

  getProfilFromId(id : string | null) : Profil | undefined{
    return this.profils.find(profil => profil.id === id);
  }
}
