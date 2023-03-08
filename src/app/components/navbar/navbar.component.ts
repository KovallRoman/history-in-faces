import { Component, Inject } from '@angular/core';
import { AuthHttpService } from '../../services/auth-http.service';
import { ActivatedRoute } from '@angular/router';
import { FacesHttpService } from '../../services/faces-http.service';
import { DOCUMENT } from '@angular/common';
import { ThemeModeService } from '../../services/theme-mode.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { OfflineOnofflineService } from '../../services/offline-onoffline.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  get isOffline(): boolean {
    return this.offlineOnofflineService.isOffline;
  }

  get token(): string {
    return this.authHttpService.token;
  }

  get isDarkThemeEnabled(): boolean {
    return this.themeModeService.isDarkThemeEnabled;
  }

  constructor(
    private readonly authHttpService: AuthHttpService,
    private readonly route: ActivatedRoute,
    private readonly facesService: FacesHttpService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly themeModeService: ThemeModeService,
    private readonly offlineOnofflineService: OfflineOnofflineService,
  ) {
  }

  onChange(event: MatSlideToggleChange) {
    this.themeModeService.switchMode(event.checked);
  }

  onLogoutClick(): void {
    this.authHttpService
      .logoutUser()
  }
}
