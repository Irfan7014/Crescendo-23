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
  getContentDetailById(id:string){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getContentById?id='+id, {
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

  getAllContent(){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getAllContent', {
        headers: headers,
        observe: 'response',
      });
  }
  getAllCourses(){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getCourse', {
        headers: headers,
        observe: 'response',
      });
  }

  getAllBooks(){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getContent?type=4', {
        headers: headers,
        observe: 'response',
      });
  }

  getAllVideos(){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getContent?type=1', {
        headers: headers,
        observe: 'response',
      });
  }

  getAllBlogs(){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getContent?type=3', {
        headers: headers,
        observe: 'response',
      });
  }

  getCourseByCategory(category:string){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getCourseByCategory?category='+category, {
        headers: headers,
        observe: 'response',
      });
  }

  getVideosByCategory(category:string){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getTypeAndContent?type=1&category='+category, {
        headers: headers,
        observe: 'response',
      });
  }

  getBlogsByCategory(category:string){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getTypeAndContent?type=3&category='+category, {
        headers: headers,
        observe: 'response',
      });
  }

  getBooksByCategory(category:string){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getTypeAndContent?type=4&category='+category, {
        headers: headers,
        observe: 'response',
      });
  }

  getRecommendedVideos(title:string){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getRecommendationByTitle?title='+title, {
        headers: headers,
        observe: 'response',
      });
  }
  getDetailsByTitle(title:string){
    const headers = new HttpHeaders()
      .set('accept', 'application/x-www-form-urlencoded')
      .set('Authorization', localStorage.getItem('access_token') || '');
    return this.http
      .get(environment.baseUrl+'getContentByTitle?title='+title, {
        headers: headers,
        observe: 'response',
      });
  }
}
