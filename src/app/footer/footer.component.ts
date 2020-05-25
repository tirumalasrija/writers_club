import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthenticationService, @Inject(DOCUMENT) private document:Document) { }

  ngOnInit() {
    const footer = this.document.querySelector('.page-footer');
    this.isLoggedIn$ = this.authService.isLoggedIn;
    footer.classList.add('footer-bg');
  }

  onLogout() {
    this.authService.logout();
  }

}