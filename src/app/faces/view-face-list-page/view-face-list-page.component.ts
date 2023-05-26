import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacesHttpService } from '../../core/services/faces-http.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FaceModel } from '../../core/models/face/face.model';
import { Subject, takeUntil } from 'rxjs';
import { OfflineMonitorService } from '../../core/services/offline-monitor.service';


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

  get isOffline(): boolean {
    return this.offlineMonitorService.isOffline;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly facesService: FacesHttpService,
    private readonly offlineMonitorService: OfflineMonitorService,
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
