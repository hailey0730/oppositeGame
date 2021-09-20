import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ControllerComponent } from './controller/controller.component';
import { MusicTrackComponent } from './music-track/music-track.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MusicService } from './service/music.service';

@NgModule({
  declarations: [
    AppComponent,
    ControllerComponent,
    MusicTrackComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    NoopAnimationsModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [
    MusicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
