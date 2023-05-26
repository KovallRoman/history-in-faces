import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IConfig, NgxMaskModule } from 'ngx-mask'
import { FacesModule } from './faces/faces.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    AppRoutingModule,
    BrowserAnimationsModule,
    FacesModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
