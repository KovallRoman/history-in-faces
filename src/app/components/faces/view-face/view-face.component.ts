import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaceModel } from '../../../models/face/face.model';
import { OfflineOnofflineService } from '../../../services/offline-onoffline.service';

@Component({
  selector: 'app-view-face',
  templateUrl: 'view-face.component.html',
  styleUrls: ['view-face.component.scss']
})

export class ViewFaceComponent {
  @Input() user!: FaceModel;
  @Output() delete = new EventEmitter<void>();
  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }
  constructor(
    private readonly offlineOnofflineService: OfflineOnofflineService,
   ) {
   }

  onDeleteClick(): void {
    this.delete.emit();
  }
}
