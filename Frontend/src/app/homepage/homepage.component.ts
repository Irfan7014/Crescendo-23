import { Component } from '@angular/core';
import {MatChipsModule, MatChipListbox} from '@angular/material/chips'
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {

  constructor(private route:Router) {
  }

  subjectDetails = [
    {
      image:'../../assets/images/maths.jpg',
      subject: 'MATHEMATICS',
      info: 'Solving math problems helps you solve life problems.',
      subsections: ['Algebra', 'Geometry', 'Probability', 'Statistics'],
    },
    {
      image:'../../assets/images/science.png',
      subject: 'SCIENCE',
      info: 'Learning science helps you solve life problems.',
      subsections: ['Biology', 'Physics', 'Zoology', 'Chemistry'],
    },
    {
      image:'../../assets/images/history.png',
      subject: 'HISTORY',
      info: 'Solving math problems helps you solve life problems.',
      subsections: ['Medieval Period', 'Ancient Time', 'Probability', 'Statistics'],
    },
    {
      image:'../../assets/images/miusic.png',
      subject: 'MUSIC',
      info: 'Solving math problems helps you solve life problems.',
      subsections: ['Piano', 'Guitar', 'Probability', 'Statistics'],
    },
  ];

  chipClicked(subsec:string){
    this.route.navigate(['/student/content-page'],{queryParams:{category:subsec.charAt(0)+subsec.substring(1).toLowerCase()}})
  }
}
