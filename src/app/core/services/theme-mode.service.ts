import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class ThemeModeService {
  isDarkThemeEnabled: boolean = localStorage.getItem('isDarkThemeEnabled') === 'true';

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.initTheme();
  }

  private initTheme(): void {
    this.toggleClass();
  }

  switchMode(isDarkThemeEnabled: boolean): void {
    this.isDarkThemeEnabled = isDarkThemeEnabled;
    this.toggleClass();
    localStorage.setItem('isDarkThemeEnabled', String(isDarkThemeEnabled));
  }

  private toggleClass(): void {
    this.document.body.classList.toggle('my-light-theme', !this.isDarkThemeEnabled);
  }
}
