import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { LogInComponent } from './log-in/log-in.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthInterceptorService } from '../core/services/auth-interceptor.service';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SignUpUserComponent,
    LogInComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    LayoutModule,
    RouterModule,
    UserRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ]
})
export class UsersModule {

}
