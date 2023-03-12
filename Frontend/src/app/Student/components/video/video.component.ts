import { HttpClient } from '@angular/common/http';
import {Component, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { StudentService } from '../../student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  recCoursesName:string[] = [];
  recCourses:any = []
  video!:any;
  link:string = ''
  expert:string = ''
  courseLanguage:string = 'English'
  courseCategory:string = 'Maths'
  quizCount:number = 2;
  lessonCount:number = 5;
  videoId:string = ''; 
  constructor(private http:HttpClient, private _studentService: StudentService,private renderer:Renderer2, private activatedRoute: ActivatedRoute){

  }
  ngOnInit(){
    this.videoId = this.activatedRoute.snapshot.queryParamMap.get('id')!;
    this._studentService.getContentDetailById(this.videoId).subscribe((res:any)=>{
      this.video = res.body;
      this.link = this.video.link;
      this._studentService.getUserName(this.video.uploader).subscribe((res1:any)=>{
        this.expert = res1.body.name
      },(err:Error)=>{});
      this._studentService.getRecommendedVideos(this.video.title).subscribe((res2:any)=>{
        for(let i in res2.body){
          this.recCoursesName.push(res2.body[i]);
          this._studentService.getDetailsByTitle(res2.body[i]).subscribe((res3:any)=>{
            this.recCourses = res3.body;
          },(err:Error)=>{});
        }

      },(err:Error)=>{});
    },(err:Error)=>{});
  }

}
