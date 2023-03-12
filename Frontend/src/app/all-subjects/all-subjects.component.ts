import { Component } from '@angular/core';
import { StudentService } from '../Student/student.service';

@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.css']
})
export class AllSubjectsComponent {
  courseFlag: boolean = true;
  bookFlag: boolean = false;
  blogFlag: boolean = false;
  videoFlag: boolean = false;
  courseDetails:any = [];

  bookDetails:any = [];

  blogDetails:any = [];

  videoDetails:any = [];
  constructor(private _studentService:StudentService){}
  ngOnInit(){
    this.courseFlag = true;
    this._studentService.getAllCourses().subscribe((res:any)=>{
      this.courseDetails = res.body;
    },(err:Error)=>{});

    this._studentService.getAllBooks().subscribe((res:any)=>{
      console.log(res);
      this.bookDetails = res.body;
    },(err:Error)=>{});

    this._studentService.getAllBlogs().subscribe((res:any)=>{
      console.log(res);
      this.blogDetails = res.body;
    },(err:Error)=>{});

    this._studentService.getAllVideos().subscribe((res:any)=>{
      console.log(res);
      this.videoDetails = res.body;
    },(err:Error)=>{});

  }
  setCourses() {
    this.courseFlag = true;
    this.bookFlag = false;
    this.blogFlag = false;
    this.videoFlag = false;
  }

  setBooks() {
    this.courseFlag = false;
    this.bookFlag = true;
    this.blogFlag = false;
    this.videoFlag = false;
  }

  setBlogs() {
    this.courseFlag = false;
    this.bookFlag = false;
    this.blogFlag = true;
    this.videoFlag = false;
  }

  setVideos() {
    this.courseFlag = false;
    this.bookFlag = false;
    this.blogFlag = false;
    this.videoFlag = true;
  }

}
