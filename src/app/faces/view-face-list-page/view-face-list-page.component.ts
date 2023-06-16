import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacesHttpService } from '../../core/services/faces-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FaceModel } from '../../core/models/face/face.model';
import { Subject, takeUntil } from 'rxjs';
import { OfflineMonitorService } from '../../core/services/offline-monitor.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import {
  RegistrationSnackBarContentComponent
} from '../../core/registration-snack-bar-content/registration-snack-bar-content.component';
import { AuthHttpService } from '../../core/services/auth-http.service';


@Component({
  selector: 'app-view-face-list-page',
  templateUrl: './view-face-list-page.component.html',
  styleUrls: ['./view-face-list-page.component.scss'],
})
export class ViewFaceListPageComponent implements OnInit, OnDestroy {
  users: FaceModel[];
  id!: string;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();
  private message: MatSnackBarRef<RegistrationSnackBarContentComponent>;

  get isOffline(): boolean {
    return this.offlineMonitorService.isOffline;
  }

  private get isUserLoggedIn(): boolean {
    return !!this.authHttpService.token;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly facesService: FacesHttpService,
    private readonly offlineMonitorService: OfflineMonitorService,
    private readonly authHttpService: AuthHttpService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initAllFace();
    this.initAll();
  }

  openSnackBar(): void {
    if (!this.isUserLoggedIn) {
      this.snackBar.openFromComponent(RegistrationSnackBarContentComponent, {
        data: {
          message: this.message
        },
        duration: 3000,
      });
      return;
    }

    this.router.navigate(['addFace']);
  }

  private initAll(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id')),
      takeUntil(this.destroy$),
    ).subscribe(data => this.id);
  }

  private initAllFace(): void {
    this.isLoading = true;
    this.facesService.getAllFaces()
      .pipe(takeUntil(this.destroy$))
      .subscribe((faces) => {
        this.users = faces;
        this.isLoading = false;
      });
  }

  onDelete(face: FaceModel): void {
    this.isLoading = true;
    this.facesService.deleteFace(face.id)
      .pipe(
        switchMap(() => this.facesService.getAllFaces()),
        takeUntil(this.destroy$),
      )
      .subscribe((faces) => {
        this.users = faces;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
