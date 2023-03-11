import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, SafePipe } from './app.component';
import { RegisterComponent } from './Registrations/register/register.component';
import { LoginComponent } from './Registrations/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { OtpComponent } from './Registrations/otp/otp.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import {MatSnackBarModule} from '@angular/material/snack-bar'
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LandingPageComponent,
    SafePipe,
    OtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    NgxOtpInputModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient],
      }
    }),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}