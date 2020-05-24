import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
      let number = window.scrollY;
      let nav = document.querySelector('.navbar ');

      if(number > 100){
       nav.classList.add('fixed-top');

        //console.log("Scroll Event");
      }else{
        nav.classList.remove('fixed-top')
      }
    
    }
    
profilepath:string;
  isLoggedIn$: Observable<boolean>;
  logout =false;
  window:any;
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