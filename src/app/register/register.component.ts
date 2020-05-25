import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Cat } from '../_models/cat';
import {DOCUMENT} from '@angular/common'

import { CategoriesService } from '../_services/categories.service';
import { AlertService, UserService } from '../_services';
import { MustMatch } from "../_helpers/must-match.validator";
import { inject } from '@angular/core/testing';
@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit,OnDestroy {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    geolat:any;
    location:string;
    geolng:any;
    token:any;
    gender: any;
users: any[] =[];
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private category: CategoriesService, @Inject(DOCUMENT) private document: Document) { }

    ngOnInit() {
        const body = this.document.body;
        body.classList.add('bg-none');
        this.registerForm = this.formBuilder.group({
         name: ['', Validators.required],
         lastname: ['', Validators.required],
          country: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          mobile_number: ['', [Validators.required, Validators.minLength(10)]],          
          gender: ['Male'],
          dob:['', Validators.required],
          state:['Andhrapradesh'],
          zip:['517644'],
          geolat:[''],
          geolng:[''],
        //  username: ['newtest', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
       
    }
    public handleAddressChange(address: any) {
       // if(address.photos && address.photos.length > 0){
       //     console.dir(address.photos[0].getUrl({maxHeight:500,maxWidth:500}));
      //  }
       // let x = this.getComponentByType(address,"street_number");
      // this.location=address.formatted_address;
      for (var i = 0; i < address.address_components.length; i++) {
        var addressType = address.address_components[i].types[0];
      
        // for the country, get the country code (the "short name") also
        if (addressType == "country") {
            this.location=address.address_components[i].short_name;
        }
      }
      console.log(this.location)
       this.geolat = address.geometry.location.lat();
       this.geolng = address.geometry.location.lng();
        console.log(address.geometry.location.lng());
        console.log(address.geometry.location.lat());
      //  console.log(address.geometry.location.toJSON());
       // console.log(address.geometry.viewport.getNorthEast());
        // Do some stuff
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        
        this.submitted = true;
console.log(this.registerForm.value);
        // stop here if form is invalid
        if (this.registerForm.invalid) {
           
            return;
        }

        this.loading = true;
        this.category.getToken().subscribe(
            data => {
              //  alert(this.token);
             this.token=data;
             let newUser = this.registerForm.value;
             this.registerForm.get("geolng").setValue(this.geolng);
             this.registerForm.get("geolat").setValue(this.geolat);
             this.registerForm.get("country").setValue(this.location);
        this.userService.register(this.registerForm.value,this.token.access_token)
            .pipe(first())
            .subscribe(
                data => {
                   
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
            });

    }
    ngOnDestroy(){
        const body = this.document.body;
        body.classList.remove('bg-none');
    }
}
