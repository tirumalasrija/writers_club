import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
profilepath:string;
  isLoggedIn$: Observable<boolean>;
  logout =false;
cuser:any;
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  //  console.log(this.logout)
    this.isLoggedIn$ = this.authService.isLoggedIn;
    console.log(this.isLoggedIn$.source);
    this.cuser= JSON.parse(localStorage.getItem('currentUser'));
    if(this.cuser)
    {
     
this.profilepath=this.cuser.path;
console.log(this.cuser);
    }else if(!this.profilepath)
    {
      this.profilepath="http://universitiesconnect.com/bongoswriters/images/placeholder.png";
    }
  }

  onLogout() {
    this.logout=true;
    this.authService.logout();
  }

}