import { AuthGuard } from './../auth/auth.guard';
import { SignupComponent } from './../auth/signup/signup/signup.component';
import { LoginComponent } from './../auth/login/login/login.component';
import { PostCreateComponent } from './../post/post-create/post-create.component';
import { PostListComponent } from './../post/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes} from '@angular/router';

const routes : Routes =[
{
  path : '',
component : PostListComponent},
{
  path : 'create',
  component : PostCreateComponent,
  canActivate : [AuthGuard]
},
{
  path : 'edit/:postId',
  component : PostCreateComponent,
  canActivate : [AuthGuard]
},
{
  path : 'login',
  component : LoginComponent

},
{
  path : 'signup',
  component : SignupComponent

}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports : [
     RouterModule
  ],
  providers : [AuthGuard]
})
export class AppRoutingModule { }
