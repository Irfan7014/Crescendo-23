import { Component } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  recCourses = [
    {
      title:'The Three Musketeers',
      expert: 'Warren Wade',
      category:'English'
    },
    {
      title:'The Three Musketeers',
      expert: 'Warren Wade',
      category:'English'
    },
    {
      title:'The Three Musketeers',
      expert: 'Warren Wade',
      category:'English'
    },
    {
      title:'The Three Musketeers',
      expert: 'Warren Wade',
      category:'English'
    }
  ]
  expert:string = 'Wade Warren'
  courseLanguage:string = 'English'
  courseCategory:string = 'Maths'
  quizCount:number = 2;
  lessonCount:number = 5;
  constructor(){

  }
  ngOnInit(){}

}
