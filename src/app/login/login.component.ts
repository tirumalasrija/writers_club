import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Cat } from '../_models/cat';
import { UserService } from '../_services';
import { CategoriesService } from '../_services/categories.service';
import { AlertService, AuthenticationService } from '../_services';
import { BehaviorSubject } from 'rxjs';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { DOCUMENT } from '@angular/common';
@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
 
})
export class LoginComponent implements OnInit,OnDestroy {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    formData1;
    returnUrl: string;
    private loggedIn = new BehaviorSubject<boolean>(false); // {1}
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private socialAuthService: AuthService,
        private router: Router,
        private authenticationService: AuthenticationService,private category: CategoriesService,
        private alertService: AlertService,
        @Inject(DOCUMENT) private document: Document) {

        }
        cats: Cat[]=[] ; 
        token:any;
        islogged : boolean;
    ngOnInit() {
        this.document.body.classList.add('bg-none');
      //  this.getCateg();
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/wrtiestory';
    }
    public socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
        if(socialPlatform == "google"){
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        } 
        this.islogged=false;
        
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
            console.log(socialPlatform+" sign in data : " , userData);
            // Now sign-in with userData
            // ...
            this.formData1 = {'name': userData.name,
            'email': userData.email ,
            'path': userData.image };
            this.userService.registergmail(this.formData1,1)
            .pipe(first())
            .subscribe(
                data => {
                   let id:any=data;
                    let nedata={"id":id.data,"name":userData.name,"path":userData.image,"token":"fake-jwt-token"};
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(nedata));
                    this.loggedIn.next(true);
                    this.islogged=true;
                    
                    this.router.navigateByUrl('/wrtiestory');
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
         
          }
        );
      }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
    
        this.loading = true;
        this.category.getToken().subscribe(
            data => {
                this.token=data;
               // alert(this.token);
        this.authenticationService.login(this.f.email.value, this.f.password.value,this.token.access_token)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
            });
    }
    getCateg()
    {
      this.category.getToken().subscribe(
        data => {
           // alert(this.token);
         this.token=data;
         this.category.getAllC(this.token.access_token).pipe(first()).subscribe(cats => {
          this.cats = cats;
      });
    });
}

    ngOnDestroy(){
        this.document.body.classList.remove('bg-none');
    }
}
