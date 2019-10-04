import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
    res:any;
   islogged : boolean;
    private loggedIn = new BehaviorSubject<boolean>(false); // {1}

 
    constructor(private http: HttpClient) { this.islogged = false; }
    get isLoggedIn() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn.next(true);
            return this.loggedIn.asObservable(); // {2}
        }else{
        return this.loggedIn.asObservable(); // {2}
        }
        
      }
    login(username: string, password: string,token:string) {
        let headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',            
             });
        let options = { headers: headers };
        return this.http.post<any>(`${environment.testUrl}/login?access_token=`+token, { email: username, password: password },options)
            .pipe(map(res => {
                this.res=res;
             //   console.log(res.data.name);
//let nedata= user.data;
                // login successful if there's a jwt token in the response
                let nedata={"id":this.res.data.user_id,"name":this.res.data.name,"path":this.res.data.profile_path,"token":"fake-jwt-token"};
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(nedata));
                    this.islogged = true;
                    this.loggedIn.next(true);

                return nedata;
            }));
    }

    logout() {
        this.loggedIn.next(false);
        this.islogged = false;
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}