import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models';
import {Observable} from "rxjs/observable";

@Injectable()
export class UserService {
    
    constructor(private http: HttpClient) { }

    getAll() {
       
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        let headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
             });
        let options = { headers: headers };
        
          return this.http.get(`${environment.testUrl}/getUser?id=`+id,options);
       
    }
    createStory(users: User,token) {
        //console.log(this.getAllC().subscribe());
        let headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
           });
      let options = { headers: headers };
      
        return this.http.post(`${environment.testUrl}/createStory?access_token=`+token, users,options);
    
      }
    register(users: User,token) {
        //console.log(this.getAllC().subscribe());
        let headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
           });
      let options = { headers: headers };
      
        return this.http.post(`${environment.testUrl}/registration?access_token=`+token, users,options);
    
      }
      registergmail(users: User,token) {
        //console.log(this.getAllC().subscribe());
        let headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
           });
      let options = { headers: headers };
      
        return this.http.post(`${environment.testUrl}/registrationgmail?access_token=`+token, users,options);
    
      }
  /* register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }
*/
    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
    
}