import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceModel } from '../../core/models/face/face.model';
import { ActivatedRoute } from '@angular/router';
import { FacesHttpService } from '../../core/services/faces-http.service';
import { Subject, takeUntil } from 'rxjs'


@Component({
  selector: 'app-view-face-page',
  templateUrl: './view-face-page.component.html',
  styleUrls: ['./view-face-page.component.scss'],
})

export class ViewFacePageComponent implements OnInit, OnDestroy {
  face: FaceModel;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private facesHttpService: FacesHttpService,
  ) {
  }

  ngOnInit(): void {
    this.initFace();
  }

  private initFace(): void {
    this.isLoading = true;
    this.facesHttpService.getFace(this.activatedRoute.snapshot.params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((face) => {
        this.isLoading = false;
        this.face = face;

      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
