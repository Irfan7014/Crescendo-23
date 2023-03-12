import { Component } from '@angular/core';
import { StudentService } from '../Student/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent {
  courseFlag: boolean = true;
  bookFlag: boolean = false;
  blogFlag: boolean = false;
  videoFlag: boolean = false;

  category:string = '';
  courseDetails:any = [];

  bookDetails:any = [];

  blogDetails:any = [];

  videoDetails:any = [];
  constructor(private _studentService: StudentService,private route:Router,private activatedRoute: ActivatedRoute){}
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
  ngOnInit(){
    this.category = this.activatedRoute.snapshot.queryParamMap.get('category')!;
    console.log(this.category);
    this._studentService.getCourseByCategory(this.category).subscribe((res:any)=>{
      this.courseDetails = res.body;
    },(err:Error)=>{})

    this._studentService.getBlogsByCategory(this.category).subscribe((res:any)=>{
      this.blogDetails = res.body;
    },(err:Error)=>{})

    this._studentService.getBooksByCategory(this.category).subscribe((res:any)=>{
      this.bookDetails = res.body;
    },(err:Error)=>{})

    this._studentService.getVideosByCategory(this.category).subscribe((res:any)=>{
      this.videoDetails = res.body;
    },(err:Error)=>{})
  }

  viewVideo(det:any){
    this.route.navigate(['/student/video/'],{queryParams:{category:det.category,id:det._id}});
  }

}
