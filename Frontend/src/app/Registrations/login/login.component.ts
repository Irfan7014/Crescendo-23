import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = ''
  password:string = ''
  hidePassword:boolean = true;
  isValidPassword:boolean = false;
  constructor(private _auth:AuthService,private route:Router){}
  checkLoginDetails(){

  }

  validatePasswordAndOTP(value:string, type:string) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,}$/;
    if (String(value).match(decimal)) {
      return true;
    } else {
      return false;
    }
  }

  onPasswordValidation() {
    if (this.password.length > 8 && this.validatePasswordAndOTP(this.password, 'password'))
      this.isValidPassword = true;
    else 
      this.isValidPassword = false;
  }

  login(){
    this._auth.login(this.email, this.password).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('access_token','Bearer '+res.body.access_token);
      this.route.navigate(['/student/video']);
      this._auth.getUserDetails().subscribe((res1:any)=>{
        localStorage.setItem('userType',res1.body.role.split('.')[1]);
        localStorage.setItem('isLoggedIn',"true");

//         activity
// : 
// {content_viewed: Array(2), courses_enrolled: {…}, last_active: '2023-03-11T11:06:47.635578'}
// dob
// : 
// "2000-03-11T00:00:00"
// email
// : 
// "warren@test.com"
// gender
// : 
// "M"
// name
// : 
// "Warren"
// password
// : 
// "$5$rounds=535000$/pytx9td0c0IohSr$bUAuYcA9tpPKKis8Rcvcxlebsz9v92sc3hGCdmb0X61"
// phone
// : 
// 9867538313
// role
// : 
// "UserTypeEnum.student"
// verified
// : 
// true
// _id
// : 
// "640c563ee557a13a5a68c15c"
      },(err:Error)=>{

      })
    },(err:Error)=>{})
  }
}
