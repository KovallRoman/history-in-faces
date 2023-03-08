import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../../services/auth-http.service';
import { Subject, takeUntil } from "rxjs";
import { Router } from '@angular/router';
import { OfflineOnofflineService } from '../../../services/offline-onoffline.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router,
    private readonly offlineOnofflineService: OfflineOnofflineService,
  ) {
  }

  private logIn(): void {
    this.authHttpService
      .logInUser(this.myForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.goHome();
      });
  }

  onLogInClick(): void {
    this.logIn();
  }

  ngOnInit(): void {
    this.initForm()
  }

  private goHome(): void {
    this.router.navigate(['']);
  }

  private initForm(): void {
    this.myForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
