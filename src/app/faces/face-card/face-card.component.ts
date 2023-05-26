import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaceModel } from '../../core/models/face/face.model';
import { OfflineMonitorService } from '../../core/services/offline-monitor.service';


@Component({
  selector: 'app-face-card',
  templateUrl: 'face-card.component.html',
  styleUrls: ['face-card.component.scss'],
})
export class FaceCardComponent {
  @Input() user!: FaceModel;
  @Output() delete = new EventEmitter<void>();

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }

  constructor(
    private readonly offlineOnofflineService: OfflineMonitorService,
  ) {
  }

  onDeleteClick(): void {
    this.delete.emit();
  }
}
