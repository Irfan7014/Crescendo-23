import { Component } from '@angular/core';

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
    
  }
}
