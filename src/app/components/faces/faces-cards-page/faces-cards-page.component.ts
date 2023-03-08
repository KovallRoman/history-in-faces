import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacesHttpService } from '../../../services/faces-http.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FaceModel } from '../../../models/face/face.model';
import { Subject, takeUntil } from 'rxjs';
import { AuthHttpService } from '../../../services/auth-http.service';
import { OfflineOnofflineService } from '../../../services/offline-onoffline.service';

@Component({
  selector: 'app-faces-cards-page',
  templateUrl: './faces-cards-page.component.html',
  styleUrls: ['./faces-cards-page.component.scss']
})

export class FacesCardsPageComponent implements OnInit, OnDestroy {
  users: FaceModel[];
  id!: string;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }
  constructor(
    private readonly authHttpService: AuthHttpService,
    private readonly route: ActivatedRoute,
    private readonly facesService: FacesHttpService,
    private readonly offlineOnofflineService: OfflineOnofflineService,
  ) {
  }

  ngOnInit(): void {
    this.initAllFace();
    this.initAll();
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
