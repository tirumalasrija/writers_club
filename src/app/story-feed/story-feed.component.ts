
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../_services/categories.service';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '../_services';
@Component({
  selector: 'app-story-feed',
  templateUrl: './story-feed.component.html',
  styleUrls: ['./story-feed.component.css']
})
export class StoryFeedComponent implements OnInit {
allstories:[]=[];
loaded;
loading =false;
  constructor( private categoriesService: CategoriesService,
    private userService: UserService,
    private router:Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.getAllStories();
  }
  getAllStories()
  {
    
    this.loading=true;
    this.categoriesService.getStories().subscribe(
      (res:any) => {
    this.allstories=res.data;
    console.log(this.allstories)
   this.loading=false;
       // this.router.navigate(['/myprofile']);
      
      },
      (err) => {
      
      })
  }

}
