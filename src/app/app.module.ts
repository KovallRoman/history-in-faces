import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ViewFaceComponent } from './components/faces/view-face/view-face.component';
import { AppRoutingModule } from './models/app-routing.module';
import { FacesCardsPageComponent } from './components/faces/faces-cards-page/faces-cards-page.component';
import { CreatFacePageComponent } from './components/faces/creat-face-page/creat-face-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { EditFacePageComponent } from './components/faces/edit-face-page/edit-face-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  OfflineSnackbarContentComponent
} from './components/faces/offline-snackbar-content/offline-snackbar-content.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignUpUserComponent } from './components/users/sign-up-user/sign-up-user.component';
import { LogInComponent } from './components/users/log-in/log-in.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthHttpService } from './services/auth-http.service';
import { FaceBiographyPageComponent } from './components/faces/face-biography-page/face-biography-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OfflineOnofflineService } from './services/offline-onoffline.service';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    ViewFaceComponent,
    FacesCardsPageComponent,
    CreatFacePageComponent,
    EditFacePageComponent,
    OfflineSnackbarContentComponent,
    SignUpUserComponent,
    LogInComponent,
    EditUserComponent,
    FaceBiographyPageComponent,
    NavbarComponent,
  ],

  imports: [
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule,
    MatCommonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
  ],

  providers: [
    AuthHttpService,
    OfflineOnofflineService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
