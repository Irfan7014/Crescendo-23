import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output () toggledSideNav = new EventEmitter<boolean>();
  isToggled:boolean = true;
  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth<=745){
        if(this.isToggled)
        {
          this.isToggled = false;
          this.toggledSideNav.emit(this.isToggled);
        }
    }
  }

  toggleSideNav(){
    this.isToggled = !this.isToggled;
    this.toggledSideNav.emit(this.isToggled);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(event.target.innerWidth<= 745)
    {
      if(this.isToggled)
      {
        this.isToggled = false;
        this.toggledSideNav.emit(this.isToggled);
      }
    }
  }
}