import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {UserService} from "./services/user.service";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(public userService : UserService,
              public router : Router,
              public snackBar : MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.is_logged) {
      this.snackBar.open('Impossible il faut être connecté !','OK désolé', {
        duration : 1500
      });
      this.router.navigateByUrl('/login').then();
    }
    return true;
  }

}
