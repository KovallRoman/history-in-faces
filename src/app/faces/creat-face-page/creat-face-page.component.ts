import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacesHttpService } from '../../core/services/faces-http.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OfflineMonitorService } from '../../core/services/offline-monitor.service';


@Component({
  selector: 'app-creat-face-page',
  templateUrl: 'creat-face-page.component.html',
  styleUrls: ['creat-face-page.component.scss'],
})
export class CreatFacePageComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;

  isLoading: boolean = false;

  genders: string[] = ['Male', 'Female'];

  private destroy$ = new Subject<void>();

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }

  constructor(
    private facesHttpService: FacesHttpService,
    private router: Router,
    private readonly offlineOnofflineService: OfflineMonitorService,
  ) {
  }

  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const reader = new FileReader();

    if (!file) {
      return;
    }

    reader.onload = (x) => {
      this.handleReaderLoaded(x);
    };

    reader.readAsDataURL(file);
  }

  private handleReaderLoaded(event: ProgressEvent<FileReader>): void {
    let reader = event.target as FileReader;
    this.myForm.controls['avatarUrl'].setValue(reader.result);
  }

  private goHome(): void {
    this.router.navigate(['']);
  }

  private creatNewFace(): void {
    this.isLoading = true;
    this.facesHttpService
      .newFace(this.myForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isLoading = false;
        this.goHome();
      });
  }

  onClick(): void {
    this.creatNewFace();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.myForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthedAt: new FormControl('', Validators.required),
      gender: new FormControl(''),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      story: new FormControl('', Validators.required),
      avatarUrl: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
