import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../core/services/auth-http.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { OfflineMonitorService } from '../../core/services/offline-monitor.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})

export class LogInComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  isLoading: boolean = false;

  private destroy$ = new Subject<void>();

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }

  constructor(
    private readonly authHttpService: AuthHttpService,
    private readonly router: Router,
    private readonly offlineOnofflineService: OfflineMonitorService,
  ) {
  }

  private logIn(): void {
    this.authHttpService
      .logInUser(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.goHome();
      });
  }

  onLogInClick(): void {
    this.logIn();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private goHome(): void {
    this.router.navigate(['']);
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  isErrorShown(controlName: string): boolean {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].touched;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
