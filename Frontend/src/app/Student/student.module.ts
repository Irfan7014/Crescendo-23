import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProfileComponent } from './components/profile/profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoursePlaylistComponent } from './components/course-playlist/course-playlist.component';
import { VideoComponent } from './components/video/video.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { DiscussionForumComponent } from './components/discussion-forum/discussion-forum.component';
import { DiscussionPageComponent } from './components/discussion-forum/discussion-page/discussion-page.component';

const routes: Routes = [
  {
    path: 'discussionpage',
    component: DiscussionPageComponent,
  },
  {
    path: 'discussionforum',
    component: DiscussionForumComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path:'course-playlist',
    component: CoursePlaylistComponent
  },
  {
    path:'video',
    component:VideoComponent
  }
];
@NgModule({
  entryComponents:[ProfileComponent],
  declarations: [
    CoursePlaylistComponent,
    VideoComponent,
    QuizComponent,
    DiscussionForumComponent,
    DiscussionPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    MatAutocompleteModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [DatePipe],
})
export class StudentModule {}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/');
  }
  
  export function httpTranslateLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
