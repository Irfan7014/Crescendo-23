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
  clerkSidenavItems:SidenavItem[] = [];
  studentSidenavItems:SidenavItem[] = [];
  approvedStudentSidenavItems:SidenavItem[] = [];
  isApproved:boolean = false;
  userType:string = '';
  userName:string = '';
  constructor(private route:Router, public domSanitizer: DomSanitizer, public _auth:AuthService) { }

  ngOnInit(): void {
      // for(let i=0;i<res.length;i++){
      //   this.sidenavIcons.push(res[i]);
      // }
      // this.setClerkSidenavItems();
      // this.setStudentSidenavItems();
      // this.setApprovedSidenavItems();
      
    // },(err:Error)=>{
    //   console.log("Error fetching icons");
    // });
    // this.userType = sessionStorage.getItem('userType')!;
    // this.userName = sessionStorage.getItem('firstName')! + ' ' + sessionStorage.getItem('lastName')!;
    // this.isApproved = sessionStorage.getItem('admissionTaken')=='true'?true:false;
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
    this.clerkSidenavItems = [
      // {name:this.getIconByName('Profile')[0].iconName,link:'/clerk/profile',icon:this.getIconByName('Profile')[0].iconPath,alt:'Dashboard Icon'},
      // {name:this.getIconByName('Admission Form List')[0].iconName,link:'/clerk/admission-form-list',icon:this.getIconByName('Admission Form List')[0].iconPath ,alt:'Admission Form List Icon'},
      // {name:this.getIconByName('Merit List')[0].iconName,link:'/clerk/merit-list',icon:this.getIconByName('Merit List')[0].iconPath ,alt:'Merit List Icon'},
      // {name:this.getIconByName('Master Tables')[0].iconName,link:'/clerk/master-tables',icon:this.getIconByName('Master Tables')[0].iconPath,alt:'Master Tables Icon'},
      // {name:this.getIconByName('Generate Code')[0].iconName,link:'/clerk/generate-student-code',icon:this.getIconByName('Generate Code')[0].iconPath,alt:'Generate Code Icon'},
      // {name:this.getIconByName('Reset Password')[0].iconName,link:'/clerk/reset-password',icon:this.getIconByName('Reset Password')[0].iconPath,alt:'Reset Password Icon'},
      // {name:this.getIconByName('Fee Receipt')[0].iconName,link:'/clerk/fee-payment',icon:this.getIconByName('Fee Receipt')[0].iconPath,alt:'Reset Password Icon'},
      // {name:this.getIconByName('Certificate List')[0].iconName, link:'/clerk/certificates',icon:this.getIconByName('Certificate List')[0].iconPath,alt:'Certificate Icon'}
    ]
  }

  setStudentSidenavItems(){
    this.studentSidenavItems = [
      {name:'Profile', link: '/student/profile', icon:'../../assets/images/profile.png', alt:'Profile'},
      {name:'Courses', link: '/student/course-playlist', icon:'../../assets/images/profile.png', alt:'Profile'},
      {name:'Videos', link: '/student/video', icon:'../../assets/images/profile.png', alt:'Profile'},

      
    ];
  }


  showLoader(){
    document.getElementById('loading-div')!.style.display = 'flex';
  }

  hideLoader(){
    document.getElementById('loading-div')!.style.display = 'none';
  }

}
