import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticatedUser = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  login(email:string, password:string){
    var url = environment.baseUrl+"token"
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);

    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
      observe: 'response',
    });
  }
  logoutUser() {
    this.authenticatedUser.next(null);
  }
  getUserDetails(){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getUser', {
        headers: headers,
        observe: 'response',
      })
  }
}
