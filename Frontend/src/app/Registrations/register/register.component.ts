import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = ''
  email: string = ''
  password:string = ''
  hidePassword:boolean = true;
  isValidPassword:boolean = false;
  checkRegisterDetails(){

  }
  validateEmail(email: string) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      return true;
    }
    return false;
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

  register(){
    
  }

}
