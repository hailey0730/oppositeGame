import { Component, ViewChild } from '@angular/core';
import { MusicTrackComponent } from './music-track/music-track.component';
import { MusicService } from './service/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'opposite-game';
  score = 0;
  @ViewChild(MusicTrackComponent) musicTrackComponent: MusicTrackComponent;
  constructor(private musicService: MusicService) {}

  onButtonClick(event: any) {
    this.musicTrackComponent.onButtonClick(event);
  }

  scoreCalculation(event: any) {
    // console.log(event);
    this.score += event;
    this.musicService.score += event;
  }

  resetScore(event: number) {
    this.score = 0;
  }
}
