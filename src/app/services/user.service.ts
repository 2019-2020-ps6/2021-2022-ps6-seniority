import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Senior} from "../models/senior.model";
import {Configuration, default_handicap_from_string, Handicap} from "../models/handicap.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: User;
  senior ?: Senior;
  handicaps ?: Handicap<any>[];
  handicap ?: Handicap<any>;
  currentPlayableHandicapConfig ?: Handicap<any>;
  seniors : Senior[] = [];
  allHandicaps : string[] = [];
  private url: string = "http://localhost:9428/api/users";

  public user$ : BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(this.user);
  public seniors$ : BehaviorSubject<Senior[]> = new BehaviorSubject<Senior[]>(this.seniors);
  public allHandicaps$ : BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.allHandicaps);
  public senior$ : BehaviorSubject<Senior | undefined> = new BehaviorSubject<Senior | undefined>(this.senior);
  public handicaps$ : BehaviorSubject<Handicap<any>[] | undefined> = new BehaviorSubject<Handicap<any>[] | undefined>(this.handicaps);
  public handicap$ : BehaviorSubject<Handicap<any> | undefined> = new BehaviorSubject<Handicap<any> | undefined>(this.handicap);
  public currentPlayableHandicapConfig$ : BehaviorSubject<Handicap<any> | undefined> = new BehaviorSubject<Handicap<any> | undefined>(this.currentPlayableHandicapConfig);

  constructor(private http: HttpClient) {
  }

  addUser(user: User): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.post(this.url, {...user}).subscribe(next => {
        this.user = next as User;
        this.user$.next(this.user);
        if (next) {
          this.getSeniors().then();
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  logIn(user: User): Promise<boolean> {
    return new Promise(resolve => {
      this.http.post(this.url + "/login", {...user}).subscribe({
        next : value => {
          this.user = value as User;
          this.user$.next(this.user);
          this.getSeniors().then();
          resolve(true);
        },
        error : err => resolve(false)
      })
    });
  }

  getSeniors() : Promise<Senior[]> {
    return new Promise<Senior[]>(resolve => {
      this.http.get(`${this.url}/${this.user?.id}/seniors`).subscribe(next => {
        if (next) {
          this.seniors = next as Senior[];
          this.seniors$.next(this.seniors);
          resolve(this.seniors);
        }
      })
    });
  }

  getAllHandicapsConfigs() : Promise<Handicap<any>[]> {
    return new Promise(resolve => {
      this.http.get(`${this.url}/${this.user?.id}/seniors/${this.senior?.id}/handicaps`).subscribe(next => {
        this.handicaps = next as Handicap<any>[];
        this.handicaps$.next(this.handicaps);
        resolve(this.handicaps);
      })
    });
  }

  get is_logged() : boolean {
    return !!this.user;
  }

  getHandicaps() : Promise<string[]> {
    return new Promise(resolve => {
      this.http.get('http://localhost:9428/api/handicaps').subscribe(next => {
        this.allHandicaps = next as string[];
        this.allHandicaps$.next(this.allHandicaps);
        resolve(this.allHandicaps);
      })
    });
  }

  getHandicapName() : string {
    return this.handicaps && this.handicaps.length >= 1 ? this.handicaps[0].config.type : "";
  }

  addNewSenior(senior : Senior, handicap : string) : Promise<boolean> {
    return new Promise(resolve => {
      this.http.post(`${this.url}/${this.user?.id}/seniors`,{...senior}).subscribe(next => {
        const seniorAdded = next as Senior;
        if (next) {
          this.getSeniors().then(res => {
            const conf = default_handicap_from_string(handicap);
            const hand : Handicap<any> = {
              config: conf,
              name : "Default",
              seniorId: parseInt(<string>seniorAdded.id)
            }
            this.http.post(`${this.url}/${this.user?.id}/seniors/${seniorAdded?.id}/handicaps`,{...hand}).subscribe(next => {
              if (next)
                resolve(true);
              else
                resolve(false);
            })
          });
        }
      });
    });
  }

  changeSenior(senior : Senior) {
    this.senior = senior;
    this.senior$.next(this.senior);
  }

  changeHandicap(handicap : Handicap<any>) {
    this.handicap = handicap;
    this.handicap$.next(this.handicap);
  }

  changeCurrentPlayableHandicapConfig(handicap : Handicap<any>) {
    this.currentPlayableHandicapConfig = handicap;
    this.currentPlayableHandicapConfig$.next(this.currentPlayableHandicapConfig);
  }

  updateHandicapConfig<T extends Configuration>(handicapConfig : Handicap<T>) : Promise<any> {
    return new Promise(resolve => {
      this.http.put(`${this.url}/${this.user?.id}/seniors/${this.senior?.id}/handicaps/${handicapConfig?.id}`,{...handicapConfig}).subscribe( next => {
          this.handicap = next as Handicap<any>;
          this.handicap$.next(this.handicap);
          resolve(this.handicap);
        });
    });
  }

}
