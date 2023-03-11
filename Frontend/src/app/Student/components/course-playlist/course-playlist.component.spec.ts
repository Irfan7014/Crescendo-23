import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlaylistComponent } from './course-playlist.component';

describe('CoursePlaylistComponent', () => {
  let component: CoursePlaylistComponent;
  let fixture: ComponentFixture<CoursePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursePlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
