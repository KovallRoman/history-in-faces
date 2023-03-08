import {Component} from '@angular/core';
import {MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'inspector-offline-snackbar-content',
  templateUrl: 'offline-snackbar-content.component.html',
  styleUrls: ['offline-snackbar-content.component.scss'],
})

export class OfflineSnackbarContentComponent {
  constructor(private matSnackBarRef: MatSnackBarRef<OfflineSnackbarContentComponent>) {
  }

  onCloseClick(): void {
    this.matSnackBarRef.dismissWithAction();
  }
}
