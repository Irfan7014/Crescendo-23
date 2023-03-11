import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentModule } from './Student/student.module';
import { ExpertModule } from './Expert/expert.module';
import { LoginComponent } from './Registrations/login/login.component';
import { RegisterComponent } from './Registrations/register/register.component';
const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
