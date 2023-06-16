import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  OfflineSnackbarContentComponent,
} from './offline-snackbar-content/offline-snackbar-content.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component';
import {
  RegistrationSnackBarContentComponent
} from './registration-snack-bar-content/registration-snack-bar-content.component';


@NgModule({
  declarations: [
    NavbarComponent,
    OfflineSnackbarContentComponent,
    FooterComponent,
    RegistrationSnackBarContentComponent,
  ],
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  providers: [],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
})
export class CoreModule {
}
