import { ErrorInterceptor } from './error-interceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostListComponent } from './post/post-list/post-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { LoginComponent } from './auth/login/login/login.component'
@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,

    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule

  ],
  providers: [{
    provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true
  },
  {
    provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true
  }
],

  bootstrap: [AppComponent]
})
export class AppModule { }
