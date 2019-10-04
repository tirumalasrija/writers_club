import { Component, OnInit } from '@angular/core';
import { Validators, ValidatorFn, AbstractControl, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CategoriesService } from '../_services/categories.service';
import { AlertService, UserService } from '../_services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  sendEmailForm: FormGroup;
  createGroup: FormGroup;
  allgroups: [] = [];
  loading = false;
  loaded;
  submitted = false;
  display = 'none';
  display1 = 'none';
  constructor(private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private http: HttpClient,
    private categoriesService: CategoriesService,
  ) { }
  listemails: any;
  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getGroupMembers();
    this.sendEmailForm = this.fb.group({
      'toAddress': ['', [Validators.required, this.commaSepEmail]],
      "user_id": currentUser.id
    });

    this.createGroup = this.fb.group({
      'name': ['', [Validators.required]],
      'members': ['', [Validators.required]],
      "user_id": currentUser.id
    });
    this.getAllGroups();
  }
  openModal() {

    this.alertService.clear();
    this.display = 'block';
  }
  openModal1() {
    this.alertService.clear();
    this.display1 = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
    this.display1 = 'none';
  }
  send(value: any) {
    console.log(value);
    this.createGroupMembers();
    this.getGroupMembers();
    this.alertService.success('Member INVITED successful', true);
    //.listemails=value.toAddress;
  }
  commaSepEmail = (control: AbstractControl): { [key: string]: any } | null => {
    const emails = control.value.split(',');
    const forbidden = emails.some(email => Validators.email(new FormControl(email)));
    console.log(forbidden);
    return forbidden ? { 'toAddress': { value: control.value } } : null;
  };

  removeMember(id: number) {
    this.loading = true;
    this.categoriesService.removeMember(id).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        // this.router.navigate(['/myprofile']);
        this.getGroupMembers();
      },
      (err) => {
        this.loading = false;
      })
  }
  removeGroup(id) {
    this.loading = true;
    this.categoriesService.removeGroup(id).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        // this.router.navigate(['/myprofile']);
        this.getAllGroups();
      },
      (err) => {
        this.loading = false;
      })
  }
  /*sendmailGroup(id)
  {
   this.loading=true;
 
   this.categoriesService.sendmailGroup(id).subscribe(
     (res:any) => {
   console.log(res);
   this.loading = false;
      // this.router.navigate(['/myprofile']);
     this.getAllGroups();
     },
     (err) => {
      
      this.loading = false;
     })
  }*/
  createGroupMembers() {

    // alert(this.id)
    this.loading = true;
    this.categoriesService.createGroupMember(this.sendEmailForm.value).subscribe(
      (res: any) => {
        this.loading = false;
        this.listemails = res.data[0];
        //  this.router.navigate(['/myprofile']);
      },
      (err) => {
        //this.loading = false;
      })
  }
  getGroupMembers() {
    this.loading = false;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    this.categoriesService.getGroupMembers(currentUser.id).subscribe(
      (res: any) => {
        this.listemails = res.data;
        console.log(this.listemails)
        this.loading = false;
        // this.router.navigate(['/myprofile']);
      },
      (err) => {
        this.listemails = "";
        this.loading = false;
      })
  }
  create() {
    // this.submitted = true;
    // stop here if form is invalid
    if (this.createGroup.invalid) {
      return;
    }
    console.log(this.createGroup.value);
    this.loading = true;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.createGroup.controls['user_id'].setValue(currentUser.id);
    this.categoriesService.createGroupmemberships(this.createGroup.value).subscribe(
      (res: any) => {
        console.log(res.data)
        this.loading = false;
        // this.router.navigate(['/myprofile']);
        this.alertService.success('Group Created successful', true);
        this.getAllGroups();
        this.createGroup.reset()
      },
      (err) => {
        this.loading = false;
      })

  }
  getAllGroups() {
    this.loading = false;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    this.categoriesService.getAllGroups(currentUser.id).subscribe(
      (res: any) => {
        this.allgroups = res.data;
        console.log(this.allgroups)
        this.loading = false;
        // this.router.navigate(['/myprofile']);
      },
      (err) => {
        this.loading = false;
      })

  }
}
