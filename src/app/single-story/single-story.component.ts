import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CategoriesService } from '../_services/categories.service';
import { AlertService, UserService } from '../_services';
import { Location } from '@angular/common';
@Component({
  selector: 'app-single-story',
  templateUrl: './single-story.component.html',
  styleUrls: ['./single-story.component.css']
})
export class SingleStoryComponent implements OnInit {
  story:any=[];
  loading = false;
  id:any;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private categoriesService: CategoriesService,
    private _location: Location,
    private http: HttpClient) { }

    
  
  ngOnInit() {
   // this.backClicked();
     this.id = this.route.snapshot.paramMap.get('id');
    //alert(id)
    this.getStory();
  }
  backClicked() {
    this._location.back();
  }

  getStory()
  {
     this.id = this.route.snapshot.paramMap.get('id'); 
    // alert(this.id)
   this.loading = true;
    this.categoriesService.getStory(this.id).subscribe(
      (res:any) => {
        this.loading = false;
    this.story=res.data[0];
    console.log(this.story)
    
       // this.router.navigate(['/myprofile']);
      
      },
      (err) => {
      
      })
  }

}
