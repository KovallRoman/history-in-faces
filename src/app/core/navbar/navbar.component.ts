import { Component } from '@angular/core';
import { AuthHttpService } from '../services/auth-http.service';
import { ThemeModeService } from '../services/theme-mode.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OfflineMonitorService } from '../services/offline-monitor.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent {
  get isOffline(): boolean {
    return this.offlineMonitorService.isOffline;
  }

  get token(): string {
    return this.authHttpService.token;
  }

  get isDarkThemeEnabled(): boolean {
    return this.themeModeService.isDarkThemeEnabled;
  }

  constructor(
    private readonly authHttpService: AuthHttpService,
    private readonly themeModeService: ThemeModeService,
    private readonly offlineMonitorService: OfflineMonitorService,
  ) {
  }

  onChange(event: MatSlideToggleChange): void {
    this.themeModeService.switchMode(event.checked);
  }

  onLogoutClick(): void {
    this.authHttpService
      .logoutUser();
  }
}
