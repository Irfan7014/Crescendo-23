import { Component } from '@angular/core';

@Component({
  selector: 'app-discussion-forum',
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.css'],
})
export class DiscussionForumComponent {
  popup: boolean = false;

  discussionDetails=[
    {
      qtag:"Angular Programming",
      question:"Some question?"
    },
    {
      qtag:"Flask API",
      question:"What?"
    },
    {
      qtag:"React Programming",
      question:"Question?"
    },
    
  ]

}
