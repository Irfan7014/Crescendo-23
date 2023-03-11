import { Component } from '@angular/core';
import { SafePipe } from 'src/app/app.component';
@Component({
  selector: 'app-course-playlist',
  templateUrl: './course-playlist.component.html',
  styleUrls: ['./course-playlist.component.css']
})
export class CoursePlaylistComponent {
  playlist=[
    {
      img:'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg',
      title:'Episode 1',
      time:'0:05'
    },
    {
      img:'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg',
      title:'Episode 2',
      time:'1:06'
    },
    {
      img:'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg',
      title:'Episode 3',
      time:'2:06'
    },
    {
      img:'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg',
      title:'Episode 4',
      time:'6:15'
    },
    {
      img:'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg',
      title:'Episode 5',
      time:'3:26'
    },
    {
      img:'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg',
      title:'Episode 6',
      time:'5:06'
    },
    {
      img:'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg',
      title:'Episode 7',
      time:'5:06'
    },
    {
      img:'https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg',
      title:'Episode 8',
      time:'5:06'
    }
  ]

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
  constructor(){}
  ngOnInit(){
    console.log(this.playlist)
  } 
}
