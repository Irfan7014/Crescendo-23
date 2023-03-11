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
    },(err:Error)=>{})
  }
}
