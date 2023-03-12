import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
class SidenavItem{
  constructor(public name: string, public link: string, public icon: string, public alt:string) {}
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() toggleSideNav:boolean = true;
  expertSidenavItems:any[] = [];
  studentSidenavItems:any[] = [];
  approvedStudentSidenavItems:SidenavItem[] = [];
  isLoggedIn:boolean = false;
  userType:string = '';
  userName:string = '';
  constructor(private route:Router, public domSanitizer: DomSanitizer, public _auth:AuthService) { }

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType')!;
    this.isLoggedIn = localStorage.getItem('isLoggedIn')!=='true'?true:false;
    this.setExpertSidenavItems();
    this.setStudentSidenavItems();
    //TODO : Fetch admission confirmed status and set {this.isApproved} value accordingly
  }

  logout() {
    this._auth.authenticatedUser.next('loggedOut');
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

  formatDate(date:any){
    var app_date = date.slice(0,10).split("-");
    return app_date[2]+"-"+app_date[1]+"-"+app_date[0];
  }

  setExpertSidenavItems(){
    this.expertSidenavItems = [
      {name:'Profile', link: '/expert/profile', icon:'../../assets/images/profile.png', alt:'Profile'},
      {name:'Courses', link: '/expert/course-playlist', icon:'../../assets/images/subjectz-sidenav.png', alt:'Explore Subjects'},
      {name:'Videos', link: '/expert/video', icon:'../../assets/images/content-sidenav.png', alt:'Explore Content'},
    ]
  }

  setStudentSidenavItems(){
    this.studentSidenavItems = [
      {name:'Profile', link: 'student/profile', icon:'../../assets/images/profile-sidenav.png', alt:'Profile'},
      {name:'All Subjects', link: 'student/all-subjects', icon:'../../assets/images/all-subjects.png', alt:'All Subjects'},
      {name:'Explore Subjects', link: 'student/subject-content', icon:'../../assets/images/subjects-sidenav.png', alt:'Explore Subjects'},
      {name:'Videos', link: 'student/video', icon:'../../assets/images/content-sidenav.png', alt:'Explore Content'},

    ];
  }


  showLoader(){
    document.getElementById('loading-div')!.style.display = 'flex';
  }

  hideLoader(){
    document.getElementById('loading-div')!.style.display = 'none';
  }

}
