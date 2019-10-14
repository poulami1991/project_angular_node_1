import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms' ;
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatToolbarModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsService } from './posts/posts.service';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    PostEditComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule, MatDialogModule, MatProgressSpinnerModule, HttpClientModule
  ],
  providers: [
    PostsService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [PostEditComponent]
})
export class AppModule { }
