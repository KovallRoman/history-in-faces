import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import {FacesCardsPageComponent} from "../components/faces/faces-cards-page/faces-cards-page.component";
import {CreatFacePageComponent} from "../components/faces/creat-face-page/creat-face-page.component";
import {EditFacePageComponent} from "../components/faces/edit-face-page/edit-face-page.component";
import { SignUpUserComponent } from '../components/users/sign-up-user/sign-up-user.component';
import { LogInComponent } from '../components/users/log-in/log-in.component';
import { EditUserComponent } from '../components/users/edit-user/edit-user.component';
import { FaceBiographyPageComponent } from '../components/faces/face-biography-page/face-biography-page.component';


const appRoutes: Routes = [
  {path: '', component: FacesCardsPageComponent},
  {path: 'add', component: CreatFacePageComponent},
  {path: 'user/:id', component: EditFacePageComponent},
  {path: 'signUp', component: SignUpUserComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'editUser', component: EditUserComponent},
  {path: 'face/:id', component: FaceBiographyPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  }
)
export class AppRoutingModule {
}
