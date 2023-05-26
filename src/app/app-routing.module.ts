import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFaceListPageComponent } from './faces/view-face-list-page/view-face-list-page.component';
import { CreatFacePageComponent } from './faces/creat-face-page/creat-face-page.component';
import { ViewFacePageComponent } from './faces/view-face-page/view-face-page.component';
import { EditFacePageComponent } from './faces/edit-face-page/edit-face-page.component';

const appRoutes: Routes = [
  { path: '', component: ViewFaceListPageComponent },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'addFace', component: CreatFacePageComponent },
  { path: 'editFace/:id', component: EditFacePageComponent },
  { path: 'face/:id', component: ViewFacePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
