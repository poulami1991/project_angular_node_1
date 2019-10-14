import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { Authguard } from './auth/auth-guard';


const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent},//, canActivate: [Authguard]
  {path: 'login', component: LoginComponent},//, canActivate: [Authguard]
  {path: 'signup', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [Authguard]
})
export class AppRoutingModule { }
