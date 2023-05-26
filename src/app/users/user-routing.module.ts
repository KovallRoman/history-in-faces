import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { LogInComponent } from './log-in/log-in.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
  { path: 'signUp', component: SignUpUserComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'editUser', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
