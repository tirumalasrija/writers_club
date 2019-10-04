
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '../_services';
@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.css']
})
export class MyStoriesComponent implements OnInit {
  
  allstories:[]=[];
  loading = false;
  allgroups:[]=[];
  event:number;
  loaded;
  display='none';
  constructor( private categoriesService: CategoriesService,
    private userService: UserService,
    private router:Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.getAllStories();
    this.getAllGroups();
  }
  openModal(event){
this.event=event;
   
    this.display='block'; 


 }
 sendmailGroup(groupid:number,storyid:number)
 {
 
  this.loading=true;
  
  this.categoriesService.sendmailGroup(groupid,storyid).subscribe(
    (res:any) => {
  console.log(res);
  this.onCloseHandled();
  this.loading = false;
     // this.router.navigate(['/myprofile']);
    this.getAllGroups();
    },
    (err) => {
     
     this.loading = false;
    })
 }

 onCloseHandled(){


  this.display='none'; 


}


  getAllStories()
  {
   let  currentUser = JSON.parse(localStorage.getItem('currentUser'));
   this.loading = true;
    this.categoriesService.getStoriesById(currentUser.id).subscribe(
      (res:any) => {
    this.allstories=res.data;
    console.log(this.allstories)
    this.loading = false;
       // this.router.navigate(['/myprofile']);
      
      },
      (err) => {
        this.loading = false;
      })
  }
  getAllGroups()
  {
    this.loading=false;
    let  currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
     this.categoriesService.getAllGroups(currentUser.id).subscribe(
       (res:any) => {
     this.allgroups=res.data;
     console.log(this.allgroups)
     this.loading = false;
        // this.router.navigate(['/myprofile']);
       
       },
       (err) => {

        this.loading = false;
       })

  }

}
