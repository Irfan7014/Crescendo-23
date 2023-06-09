import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentModule } from './Student/student.module';
import { ExpertModule } from './Expert/expert.module';
import { LoginComponent } from './Registrations/login/login.component';
import { RegisterComponent } from './Registrations/register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OtpComponent } from './Registrations/otp/otp.component';
import { HomepageComponent } from './homepage/homepage.component';
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'expert',
    loadChildren: () => ExpertModule,
  },
  {
    path: 'student',
    loadChildren: () => StudentModule,
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'otp',
    component:OtpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
