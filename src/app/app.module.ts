import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera} from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer} from '@awesome-cordova-plugins/file-transfer/ngx';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      Geolocation,
      FileTransfer,
      Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
