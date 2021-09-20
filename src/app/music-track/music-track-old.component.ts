import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../service/music.service';
import Swal from 'sweetalert2';

// get music track from google sheet

@Component({
  selector: 'app-music-track',
  templateUrl: './music-track.component.html',
  styleUrls: ['./music-track.component.scss']
})
export class MusicTrackComponent implements OnInit {
  @Output() scoreCalculation = new EventEmitter();
  @Output() resetScore = new EventEmitter();
  musicTrackUp: any = [];
  musicTrackLeft: any = [];
  musicTrackRight: any = [];
  musicTrackDown: any = [];
  playInterval:any;
  currentTrack = 0;
  track = [
    {
      up: 1,
      left:0,
      right:0,
      down:0
    },
    {
      up: 0,
      left:1,
      right:1,
      down:0
    },
    {
      up: 0,
      left:0,
      right:0,
      down:1
    },
    {
      up: 1,
      left:0,
      right:0,
      down:1
    }
  ]
  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    for(var i = 0; i < 6; i ++){
      let box = {
        color: '',
        icon: ''
      }
      if (i === 0){
        box.color = 'lightyellow';
        box.icon = '';
      }
      this.musicTrackUp.push(box);
      this.musicTrackLeft.push(box);
      this.musicTrackRight.push(box);
      this.musicTrackDown.push(box);
    }
    Swal.fire({
      title: 'This is a totally opposite game.',
      confirmButtonText: `Play`,
    }).then((result) => {
      this.getRandomTrack();
    })
  }

  playMusicTrack(){
    var audio = new Audio('../../assets/music/bensound-creativeminds.mp3');
    audio.play();
    this.playInterval = setInterval(()=>{
      if (this.currentTrack < this.track.length + 6){
        this.generateMusicTrack();
      }else {
        audio.pause();
        this.stopMusicTrack();
        Swal.fire({
          title: 'Your Score: ' + this.musicService.score,
          confirmButtonText: `Replay`,
        }).then((result) => {
          this.currentTrack = 0;
          this.musicService.score = 0;
          this.resetScore.emit(0);
          this.getRandomTrack();
        })
      }
    },500);
  }

  getRandomTrack(){
    this.musicService.getSong({
      name: 'test'
    }).subscribe((res: any)=>{
      // console.log(res);
      let randomTrack = this.getRandomTrackHelper(res);
      this.track = randomTrack;
      for(var i = 0; i < randomTrack.length; i ++){
        this.track[i] = JSON.parse(randomTrack[i]);
      }
      this.playMusicTrack();
    })
  }

  getRandomTrackHelper(tracks: any){
    // random number from 0 - 1
    let index = Math.floor(Math.random() * 2);
    return tracks[index];
  }

  stopMusicTrack(){
    clearInterval(this.playInterval);
  }

  onButtonClick(direction: any){
    // all opposite
    // score calculation
    switch(direction){
      case 'down':
        if(this.musicTrackUp[0].icon !== ''){
          this.musicTrackUp[0].color = 'red';
          this.scoreCalculation.emit(1)
        }
      break;
      case 'right':
        if(this.musicTrackLeft[0].icon !== ''){
          this.musicTrackLeft[0].color = 'red';
          this.scoreCalculation.emit(1)
        }
      break;
      case 'left':
        if(this.musicTrackRight[0].icon !== ''){
          this.musicTrackRight[0].color = 'red';
          this.scoreCalculation.emit(1)
        }
      break;
      case 'up':
        if(this.musicTrackDown[0].icon !== ''){
          this.musicTrackDown[0].color = 'red';
          this.scoreCalculation.emit(1)
        }
      break;
    }
  }

  generateMusicTrack(){
    this.musicTrackUp.shift();
    this.musicTrackLeft.shift();
    this.musicTrackRight.shift();
    this.musicTrackDown.shift();
    this.musicTrackUp[0].color = 'lightYellow';
    this.musicTrackLeft[0].color = 'lightYellow';
    this.musicTrackRight[0].color = 'lightYellow';
    this.musicTrackDown[0].color = 'lightYellow';
    if (this.track[this.currentTrack]){
      this.getIcon(this.track[this.currentTrack]);
    }else{
      this.getIcon({
        up: 0,
        left:0,
        right:0,
        down:0
      });
    }
    this.currentTrack++;
  }

  getIcon(trackBox: any){
    if (trackBox.up === 1){
      this.musicTrackUp.push({
        color: '',
        icon: 'arrow_upward'
      });
    }else {
      this.musicTrackUp.push({
        color: '',
        icon: ''
      });
    }
    if (trackBox.left === 1){
      this.musicTrackLeft.push({
        color: '',
        icon: 'arrow_back'
      });
    }else {
      this.musicTrackLeft.push({
        color: '',
        icon: ''
      });
    }
    if (trackBox.right === 1){
      this.musicTrackRight.push({
        color: '',
        icon: 'arrow_forward'
      });
    }else {
      this.musicTrackRight.push({
        color: '',
        icon: ''
      });
    }
    if (trackBox.down === 1){
      this.musicTrackDown.push({
        color: '',
        icon: 'arrow_downward'
      });
    }else {
      this.musicTrackDown.push({
        color: '',
        icon: ''
      });
    }
  }
}
