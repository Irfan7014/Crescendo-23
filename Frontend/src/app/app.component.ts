import { Component } from '@angular/core';
import { Pipe, PipeTransform} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from './services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('250ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class AppComponent {
  title = 'Frontend';
  isAuthenticatedUser: boolean = false;
  isLoggedIn: boolean = false;
  userName = '';
  userType = '';
  isToggled: boolean = true;
  constructor(private _auth:AuthService){}
  ngOnInit(){
    this.userType = localStorage.getItem('userType')!;
    this.isAuthenticatedUser =
      localStorage.getItem('isLoggedIn') == 'true' ? true : false;
    this._auth.authenticatedUser.subscribe((res:any) => {
      if (res == 'loggedIn') {
        this.isAuthenticatedUser = true;
      }
      if (res == 'loggedOut') {
        this.isAuthenticatedUser = false;
      }
    });
  }
  toggleSideNav(){
    this.isToggled = !this.isToggled;
  }
  setRouterStyle(){
    if(this.isAuthenticatedUser && this.isToggled)
      return 'router-outlet-div-1'
    else if(this.isAuthenticatedUser && !this.isToggled)
      return 'router-outlet-div-2'
    else
      return '';
  }
}
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}