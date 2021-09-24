import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MusicService } from '../service/music.service';
import { ParticlesComponent } from '../particles/particles.component';
import Swal from 'sweetalert2';

// auto generate music track

@Component({
  selector: 'app-music-track',
  templateUrl: './music-track.component.html',
  styleUrls: ['./music-track.component.scss'],
})
export class MusicTrackComponent implements OnInit {
  @Output() scoreCalculation = new EventEmitter();
  @Output() resetScore = new EventEmitter();
  @ViewChild(ParticlesComponent) particlesComponent: ParticlesComponent;
  musicTrackUp: any = [];
  musicTrackLeft: any = [];
  musicTrackRight: any = [];
  musicTrackDown: any = [];
  playInterval: any;
  currentTrack = 0;
  press = {
    up: false,
    left: false,
    right: false,
    down: false,
  };
  audio: any;
  track: any = [];
  firstColColor = '#384B8D';
  hitColor = '#536DFE';
  normalColor = '#4a4a4a';
  level = 600;
  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    localStorage.setItem('gameStop', 'false');
    console.log('game start');
    this.resetMusicTracks();
    Swal.fire({
      title: 'How to play',
      text: 'When arrows reach the leftmost column, press the opposite direction arrow',
      allowOutsideClick: false,
      confirmButtonText: `Easy`,
      confirmButtonColor: '#384B8D',
      denyButtonColor: '#7C4DFF',
      cancelButtonColor: '#B254C6',
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Medium`,
      cancelButtonText: 'Hard'
    }).then((result) => {
      if (result.isConfirmed){
        this.level = 800;
      }else if (result.isDenied){
        this.level = 600;
      }else if (result.isDismissed){
        this.level = 400;
      }
      this.playMusicTrack();
    });
  }

  pauseGame(){
    clearInterval(this.playInterval);
    this.audio.pause();
    localStorage.setItem('gameStop', 'true');
  }

  restartGame(){
    this.audio.play();
    localStorage.setItem('gameStop', 'false');
    this.playInterval = setInterval(() => {
      if (this.currentTrack < this.track.length + 6) {
        this.generateMusicTrack();
      } else {
        this.stopMusicTrack();
      }
    }, this.level);
  }

  playMusicTrack() {
    let songNo = Math.floor(Math.random() * 3);
    switch (songNo) {
      case 0:
        this.audio = new Audio('../../assets/music/bensound-creativeminds.mp3');
        break;
      case 1:
        this.audio = new Audio(
          '../../assets/music/bensound-acousticbreeze.mp3'
        );
        break;
      case 2:
        this.audio = new Audio('../../assets/music/bensound-memories.mp3');
        break;
    }
    this.audio.play();
    this.playInterval = setInterval(() => {
      if (this.currentTrack < this.track.length + 6) {
        this.generateMusicTrack();
      } else {
        this.stopMusicTrack();
      }
    }, this.level);
  }

  /* getRandomTrack() {
    this.musicService
      .getSong({
        name: 'test',
      })
      .subscribe((res: any) => {
        // console.log(res);
        let randomTrack = this.getRandomTrackHelper(res);
        this.track = randomTrack;
        for (var i = 0; i < randomTrack.length; i++) {
          this.track[i] = JSON.parse(randomTrack[i]);
        }
        this.playMusicTrack();
      });
  }
 */
  /*  getRandomTrackHelper(tracks: any) {
    // random number from 0 - 1
    let index = Math.floor(Math.random() * 2);
    return tracks[index];
  } */

  stopMusicTrack() {
    clearInterval(this.playInterval);
    this.audio.pause();
    localStorage.setItem('gameStop', 'true');
    Swal.fire({
      title: 'Your Score: ' + this.musicService.score,
      confirmButtonText: `Replay`,
      allowOutsideClick: false
    }).then((result) => {
      this.currentTrack = 0;
      this.musicService.score = 0;
      this.resetScore.emit(0);
      this.startGame();
    });
  }

  onButtonClick(direction: any) {
    // all opposite
    // score calculation
    switch (direction) {
      case 'down':
        if (this.musicTrackUp[0].icon !== '') {
          this.musicTrackUp[0].color = this.hitColor;
          this.press.up = true;
          this.scoreCalculation.emit(1);
          this.particlesComponent.onEvent('up');
        } else {
          this.stopMusicTrack();
        }
        break;
      case 'right':
        if (this.musicTrackLeft[0].icon !== '') {
          this.musicTrackLeft[0].color = this.hitColor;
          this.press.left = true;
          this.scoreCalculation.emit(1);
          this.particlesComponent.onEvent('left');
        } else {
          this.stopMusicTrack();
        }
        break;
      case 'left':
        if (this.musicTrackRight[0].icon !== '') {
          this.musicTrackRight[0].color = this.hitColor;
          this.press.right = true;
          this.scoreCalculation.emit(1);
          this.particlesComponent.onEvent('right');
        } else {
          this.stopMusicTrack();
        }
        break;
      case 'up':
        if (this.musicTrackDown[0].icon !== '') {
          this.musicTrackDown[0].color = this.hitColor;
          this.press.down = true;
          this.scoreCalculation.emit(1);
          this.particlesComponent.onEvent('down');
        } else {
          this.stopMusicTrack();
        }
        break;
    }
  }

  // too hard when more than one key once
  /* getRandom(prob?:number) {
    let probability = [0, 0, 0, 1];
    if (prob === 1){
      probability.push(0);
    }
    var idx = Math.floor(Math.random() * probability.length);
    return probability[idx];
  } */

  generateMusicTrack() {
    this.musicTrackUp.shift();
    this.musicTrackLeft.shift();
    this.musicTrackRight.shift();
    this.musicTrackDown.shift();
    this.musicTrackUp[0].color = this.firstColColor;
    this.musicTrackLeft[0].color = this.firstColColor;
    this.musicTrackRight[0].color = this.firstColColor;
    this.musicTrackDown[0].color = this.firstColColor;
    // auto gen track
    let dir = Math.floor(Math.random() * 4);
    let trackbox = {
      up: 0,
      left: 0,
      right: 0,
      down: 0,
    };
    switch (dir) {
      case 0:
        trackbox.up = 1;
        break;
      case 1:
        trackbox.left = 1;
        break;
      case 2:
        trackbox.right = 1;
        break;
      case 3:
        trackbox.down = 1;
        break;
    }
    this.track.push(trackbox);
    // check if no press
    /* setTimeout(() => {
      if (this.musicTrackUp[0].icon !== '' && !this.press.up) {
        this.stopMusicTrack();
      }
      if (this.musicTrackLeft[0].icon !== '' && !this.press.left) {
        this.stopMusicTrack();
      }
      if (this.musicTrackRight[0].icon !== '' && !this.press.right) {
        this.stopMusicTrack();
      }
      if (this.musicTrackDown[0].icon !== '' && !this.press.down) {
        this.stopMusicTrack();
      }
      this.press = {
        up: false,
        left: false,
        right: false,
        down: false,
      };
    }, 600); */
    if (this.track[this.currentTrack]) {
      this.getIcon(this.track[this.currentTrack]);
    } else {
      this.getIcon({
        up: 0,
        left: 0,
        right: 0,
        down: 0,
      });
    }
    this.currentTrack++;
  }

  getIcon(trackBox: any) {
    if (trackBox.up === 1) {
      this.musicTrackUp.push({
        color: this.normalColor,
        icon: 'arrow_upward',
      });
    } else {
      this.musicTrackUp.push({
        color: this.normalColor,
        icon: '',
      });
    }
    if (trackBox.left === 1) {
      this.musicTrackLeft.push({
        color: this.normalColor,
        icon: 'arrow_back',
      });
    } else {
      this.musicTrackLeft.push({
        color: this.normalColor,
        icon: '',
      });
    }
    if (trackBox.right === 1) {
      this.musicTrackRight.push({
        color: this.normalColor,
        icon: 'arrow_forward',
      });
    } else {
      this.musicTrackRight.push({
        color: this.normalColor,
        icon: '',
      });
    }
    if (trackBox.down === 1) {
      this.musicTrackDown.push({
        color: this.normalColor,
        icon: 'arrow_downward',
      });
    } else {
      this.musicTrackDown.push({
        color: this.normalColor,
        icon: '',
      });
    }
  }

  resetMusicTracks() {
    this.musicTrackUp = [];
    this.musicTrackLeft = [];
    this.musicTrackRight = [];
    this.musicTrackDown = [];
    this.track = [];
    for (var i = 0; i < 6; i++) {
      let box = {
        color: this.normalColor,
        icon: '',
      };
      if (i === 0) {
        box.color = this.firstColColor;
        box.icon = '';
      }
      this.musicTrackUp.push(box);
      this.musicTrackLeft.push(box);
      this.musicTrackRight.push(box);
      this.musicTrackDown.push(box);
    }
  }
}
