import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../core/services/auth-http.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { OfflineMonitorService } from '../../core/services/offline-monitor.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})

export class EditUserComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;

  isLoading: boolean = false;

  id!: string;

  private destroy$ = new Subject<void>();

  get isOffline(): boolean {
    return this.offlineMonitorService.isOffline;
  }

  constructor(
    private readonly authHttpService: AuthHttpService,
    private readonly offlineMonitorService: OfflineMonitorService,
  ) {
  }

  onRequestClick(): void {
    this.authHttpService
      .editUser(this.myForm.value)
      .subscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.initUserSelf();
  }

  private initUserSelf(): void {
    this.authHttpService.getUserSelf().pipe(
      tap((user) => {
        this.id = user.id;
      }),
      takeUntil(this.destroy$),
    ).subscribe((user) => {
      this.myForm.controls['email'].setValue(user.email);
      this.myForm.controls['username'].setValue(user.username);
    });
  }

  private initForm(): void {
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
