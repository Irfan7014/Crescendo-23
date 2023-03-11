import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  buttonStyle: string='';
  selectedValue:boolean=false;
  answers:string[]=[];

  selectedAnswers(event:any) {
    console.log('Selected answers');
    this.answers.push(event.target.value)
    this.selectedValue=true;
    if(this.selectedValue){
      event.target.classList.add('selected-button');
    }
    else{
      event.target.classList.remove('selected-button');
      this.selectedValue=false;
    }
    
    console.log(this.answers)
  }
}
