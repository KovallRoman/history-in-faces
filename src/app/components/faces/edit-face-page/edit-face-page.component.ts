import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacesHttpService } from '../../../services/faces-http.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { OfflineOnofflineService } from '../../../services/offline-onoffline.service';

@Component({
  selector: 'app-edit-face-page',
  templateUrl: 'edit-face-page.component.html',
  styleUrls: ['edit-face-page.component.scss']
})

export class EditFacePageComponent implements OnInit, OnDestroy {
  myEditForm!: FormGroup;
  id!: string;
  genders: string[] = ['Male', 'Female'];
  isLoading: boolean = false;
  private subscription: Subscription;
  private destroy$ = new Subject<void>();

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private facesHttpService: FacesHttpService,
    private readonly offlineOnofflineService: OfflineOnofflineService,
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
      console.log(x)
      this.handleReaderLoaded(x);
    }

    reader.readAsDataURL(file);
  }

  private handleReaderLoaded(event: ProgressEvent<FileReader>) {
    let reader = event.target as FileReader;
    this.myEditForm.controls['avatarUrl'].setValue(reader.result);
  }

  private goHome(): void {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.initForm();
    this.initFace();
  }

  private initFace(): void {
    this.isLoading = true;
    this.facesHttpService.getFace(this.activatedRoute.snapshot.params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((face) => {
        this.isLoading = false;
        this.myEditForm.setValue({
          city: face.city,
          country: face.country,
          gender: face.gender,
          avatarUrl: face.avatarUrl,
          birthedAt: face.birthedAt,
          lastName: face.lastName,
          firstName: face.firstName,
          story: face.story
        });
      });
  }

  private initForm(): void {
    this.myEditForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      birthedAt: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      avatarUrl: new FormControl(null,),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      story: new FormControl(null, Validators.required),
    });
  }

  onUpdateClick(): void {
    this.isLoading = true;
    this.subscription = this.facesHttpService
      .updateFace(this.id = this.activatedRoute.snapshot.params['id'], this.myEditForm.value)
      .subscribe(() => {
        this.isLoading = false;
        this.goHome();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
