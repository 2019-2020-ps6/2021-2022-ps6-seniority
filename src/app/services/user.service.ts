import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: User;
  private url: string = "http://localhost:9428/api/users";

  constructor(private http : HttpClient) {
  }

  addUser(user : User) : Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.post(this.url,{... user}).subscribe(next => {
        this.user = next as User;
        if (next)
          resolve(true);
        resolve(false);
      });
    });
  }

  getUserFromId(id : string | null) : Promise<User>{
    return new Promise(resolve => {
      this.http.get(`${this.url}/${id}`).subscribe(next => {
          this.user = next as User;
          resolve(next as User);
      })
    })
  }
}
