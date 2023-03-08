import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../../services/auth-http.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { OfflineOnofflineService } from '../../../services/offline-onoffline.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  isLoading: boolean = false;
  id!: string;
  private destroy$ = new Subject<void>();

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }

  constructor(
    private authHttpService: AuthHttpService,
    private readonly offlineOnofflineService: OfflineOnofflineService,
  ) {
  }

  onRequestClick(): void {
    this.authHttpService
      .editUser(this.id, this.myForm.value)
      .subscribe(() => {
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.initUserSelf()
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
