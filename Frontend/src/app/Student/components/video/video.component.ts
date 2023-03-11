import { HttpClient } from '@angular/common/http';
import {Component, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { StudentService } from '../../student.service';

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
  video!:any;
  link:string = ''
  expert:string = ''
  courseLanguage:string = 'English'
  courseCategory:string = 'Maths'
  quizCount:number = 2;
  lessonCount:number = 5;
  constructor(private http:HttpClient, private _studentService: StudentService,private renderer:Renderer2){

  }
  ngOnInit(){
    this._studentService.getVideo().subscribe((res:any)=>{
      console.log(res.body)
      this.video = res.body[0];
      this.link = this.video.link;
      this._studentService.getUserName(this.video.uploader).subscribe((res:any)=>{
        console.log(res);
        this.expert = res.body.name
      },(err:Error)=>{

      })
    },(err:Error)=>{});
  }

}
