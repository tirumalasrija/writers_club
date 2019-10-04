import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '../_services';
import { User } from '../_models';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent implements OnInit {
  public imagePath;
  currentUser:any;
  public getusers:any=[];
  imgURL: any;
  new:any;
  loaded;
  loading=false;
  public message: string;
  myprofile: FormGroup;
  submitted = false;
  filedatanew:any;
  testUrl="http://universitiesconnect.com/bongoswriters/api_1_0_0/Api";

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading=true;
     this.new= this.getById();
    
    this.imgURL="http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
    this.myprofile = this.formBuilder.group({
      name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  });
  console.log(this.getusers);
 
  }
  get f() { return this.myprofile.controls; }
  selectedFile: ImageSnippet;

  constructor( private formBuilder: FormBuilder,
    private alertService: AlertService,
    private imageService: CategoriesService,
    private userService: UserService,
    private http: HttpClient){}
  fileData: File = null;

  
fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
}
processFile(imageInput: any) {

  this.preview(imageInput.files);
  const file: File = imageInput.files[0];
  let reader = new FileReader();
  

  reader.addEventListener('load', (event: any) => {

    this.selectedFile = new ImageSnippet(event.target.result, file);
   let token="6f25ef8193e3f77676d1f73b8eef9c3c5e7b89e0";
this.filedatanew=this.selectedFile.file;
console.log(this.filedatanew);
    /*this.imageService.uploadImage(this.selectedFile.file,token).subscribe(
      (res) => {
      
      },
      (err) => {
      
      }) */
  });

  reader.readAsDataURL(file);
 
  
} 
onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.myprofile.invalid) {
      return;
  }
   /* const formData = new FormData();
    formData.append('data', this.myprofile.value);
    formData.append('file', this.fileData);
    let token="6f25ef8193e3f77676d1f73b8eef9c3c5e7b89e0";
    this.http.post(this.testUrl+"/profileUpdate?access_token="+token, this.filedatanew)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      }) */
      const formData = new FormData();
      formData.append("user_id",this.currentUser.id);
      formData.append('name', this.myprofile.get("name").value);
      formData.append('email', this.myprofile.get("email").value);
      formData.append('mobile_number', this.myprofile.get("mobile_number").value);
      formData.append('file', this.filedatanew);
     
      this.imageService.uploadImage(formData).subscribe(
        (res) => {
          this.alertService.success('Updated successful', true);
         // this.router.navigate(['/myprofile']);
        
        },
        (err) => {
        
        })
}

 
 preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type; 
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  getById()
  {
    let id=this.currentUser.id;
   
    this.userService.getById(id).subscribe(
      (res:any) => {
        this.loading=false;
       // console.log(res.data)
        this.getusers=res.data;
        console.log(res.data)
        this.myprofile.get('email').setValue(this.getusers.email);
        this.myprofile.get('mobile_number').setValue(this.getusers.mobile_number);
        this.myprofile.get('name').setValue(this.getusers.name);
        this.imgURL=this.getusers.profile_path;
        
       // this.router.navigate(['/myprofile']);
      
      },
      (err) => {
      
      })
  }
 

 

}
