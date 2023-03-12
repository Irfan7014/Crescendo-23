import { Component } from '@angular/core';

@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.css']
})
export class DiscussionPageComponent {

  comments=[
    {
      name:"John Doe",
      commentText:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium temporibus vitae nam nihil adipisci, iure, adeveniet voluptatibus corporis commodi esse quidem hic, consequatur laborum rem aperiam error non reiciendis."
    },
    {
      name:"Doe",
      commentText:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium temporibus vitae nam nihil adipisci, iure, adeveniet voluptatibus corporis commodi esse quidem hic, consequatur laborum rem aperiam error non reiciendis."
    }, {
      name:"John ",
      commentText:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium temporibus vitae nam nihil adipisci, iure, adeveniet voluptatibus corporis commodi esse quidem hic, consequatur laborum rem aperiam error non reiciendis."
    }
  ]
}
