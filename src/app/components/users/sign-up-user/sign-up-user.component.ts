import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../../services/auth-http.service';
import { Subject, takeUntil } from 'rxjs';
import { OfflineOnofflineService } from '../../../services/offline-onoffline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})

export class SignUpUserComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  private destroy$ = new Subject<void>();
  isLoading: boolean = false;

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router,
    private readonly offlineOnofflineService: OfflineOnofflineService,
  ) {
  }

  private singUpPost(): void {
    this.authHttpService
      .signUpUser(this.myForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.goHome();
      });
  }

  onRequestClick(): void {
    this.singUpPost();
  }

  ngOnInit(): void {
    this.initForm();
  }
  private goHome(): void {
    this.router.navigate(['']);
  }
  private initForm(): void {
    this.myForm = new FormGroup({
      password: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
