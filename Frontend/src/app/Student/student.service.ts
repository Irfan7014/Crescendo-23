import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  getVideo(){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getContent?type=1', {
        headers: headers,
        observe: 'response',
      })
  }
  getUserName(code:any){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getUserById?user_id='+code, {
        headers: headers,
        observe: 'response',
      })
  }
}
