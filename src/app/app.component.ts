import { Component, ViewChild } from '@angular/core';
import { MusicTrackComponent } from './music-track/music-track.component';
import { MusicService } from './service/music.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'opposite-game';
  score = 0;
  pauseGame = false;
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

  pause(){
    this.musicTrackComponent.pauseGame();
    this.pauseGame = true;
  }

  restart(){
    this.musicTrackComponent.restartGame();
    this.pauseGame = false;
  }

  showAbout(){
    Swal.fire({
      title: '<strong>About</strong>',
      html:
        '<strong>Made by</strong><br>Hailey<br>' +
        '<strong>Music</strong><br>https://www.bensound.com',
      showCloseButton: true,
      showConfirmButton:false
    })
  }
}
