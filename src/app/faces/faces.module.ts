import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaceCardComponent } from './face-card/face-card.component';
import { ViewFaceListPageComponent } from './view-face-list-page/view-face-list-page.component';
import { CreatFacePageComponent } from './creat-face-page/creat-face-page.component';
import { EditFacePageComponent } from './edit-face-page/edit-face-page.component';
import { ViewFacePageComponent } from './view-face-page/view-face-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthInterceptorService } from '../core/services/auth-interceptor.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FaceCardComponent,
    ViewFaceListPageComponent,
    CreatFacePageComponent,
    EditFacePageComponent,
    ViewFacePageComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatMenuModule,
    LayoutModule,
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class FacesModule {

}
