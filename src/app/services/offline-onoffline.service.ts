import {  Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  OfflineSnackbarContentComponent
} from '../components/faces/offline-snackbar-content/offline-snackbar-content.component';
import { DEFAULT_SNACKBAR_CONFIG } from '../constants/default-snackbar-config.const';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';


@Injectable({providedIn: 'root'})
export class OfflineOnofflineService {
  private snackBarRef!: MatSnackBarRef<OfflineSnackbarContentComponent>
  isOffline!: boolean;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly snackBar: MatSnackBar,
  ) {
    addEventListener('offline', (event) => {
      this.isOffline = true;

      this.openSnackBar();
      console.log(122)
    });

    addEventListener('online', (event) => {
      this.isOffline = false;

      this.snackBarRef.dismissWithAction();
    });
  }


  openSnackBar(): void {
    this.snackBarRef = this.snackBar.openFromComponent(OfflineSnackbarContentComponent, DEFAULT_SNACKBAR_CONFIG);
  }

}
