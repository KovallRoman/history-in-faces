import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceModel } from '../../../models/face/face.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FacesHttpService } from '../../../services/faces-http.service';
import { Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-face-biography-page',
  templateUrl: './face-biography-page.component.html',
  styleUrls: ['./face-biography-page.component.scss']
})

export class FaceBiographyPageComponent implements OnInit, OnDestroy {
  face: FaceModel;
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
