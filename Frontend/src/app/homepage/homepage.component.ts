import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  courseFlag:boolean=true;
  bookFlag:boolean=false;
  blogFlag:boolean=false;
  videoFlag:boolean=false;

  constructor(){
    this.courseFlag=true;
  }
  
  courseDetails = [
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'SCIENCE',
      topic: 'GRAVITATION',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'MATHEMATICS',
      topic: 'CALCULUS',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'SCIENCE',
      topic: 'GRAVITATION',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'MATHEMATICS',
      topic: 'CALCULUS',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'SCIENCE',
      topic: 'GRAVITATION',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'MATHEMATICS',
      topic: 'CALCULUS',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'MATHEMATICS',
      topic: 'CALCULUS',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'MATHEMATICS',
      topic: 'CALCULUS',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    }
  ];

  bookDetails = [
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },{
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    }

  ];

  blogDetails = [
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'HOUSE OF HORRORS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },{
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    }

  ];

  videoDetails = [
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'SHAKALAKA',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },{
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    },
    {
      img: 'https://abbeyjfitzgerald.com/wp-content/uploads/2018/01/cloud.svg',
      subject: 'PHYSICS',
      topic: 'H C VERMA',
      info: 'TUX re-inventing the wheel, and move the needle. Feature creep dogpile that but diversify kpis but market-facing',
    }

  ];

  setCourses(){
    this.courseFlag=true;
    this.bookFlag=false;
    this.blogFlag=false;
    this.videoFlag=false;
  }

  setBooks(){
    this.courseFlag=false;
    this.bookFlag=true;
    this.blogFlag=false;
    this.videoFlag=false;
  }
  
  setBlogs(){
    this.courseFlag=false;
    this.bookFlag=false;
    this.blogFlag=true;
    this.videoFlag=false;
  }

  setVideos(){
    this.courseFlag=false;
    this.bookFlag=false;
    this.blogFlag=false;
    this.videoFlag=true;
  }
}
