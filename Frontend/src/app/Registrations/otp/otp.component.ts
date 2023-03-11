import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  constructor(private route:Router, 
    private snackBar: MatSnackBar) { }

  title = 'otp';
  otpstring: string = "";
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };
  handeOtpChange(value: string[]): void {
    //console.log("single digit otp" + value);
  }

  handleFillEvent(value: string): void {
    //console.log("OTP value " + value);
    this.otpstring = value;
  }
  verifyOtpService(){}
  // verifyOtpService() {
  //   let returnValue:HttpResponse<any>;
  //   //console.log("final value " + this.otpstring)
  //   this.authenticationService.verifyOtp(this.authenticationService.phoneNo, this.otpstring).subscribe((res)=>{
  //     returnValue = new HttpResponse(res);
  //     if(returnValue.status==200){
  //       this.snackBar.open('Verification successful','Close', {
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top',
  //         duration:4000,
  //       });
  //       this.route.navigate(['/login']);
  //     }
  //     else {
  //       this.snackBar.open('Otp failed','Close', {
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top',
  //         duration:4000,
  //       });
  //     }
  //   })
  // }
}
