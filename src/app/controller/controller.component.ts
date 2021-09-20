import {
  Component,
  HostListener,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
})
export class ControllerComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event.code)
    let gameStop = JSON.parse(localStorage.getItem('gameStop') || '');
    if (!gameStop) {
      let direction = event.code.split('Arrow')[1]
        ? event.code.split('Arrow')[1].toLowerCase()
        : '';
      this.buttonClick.emit(direction);
    }
  }

  onclick(direction: string) {
    // console.log(direction);
    let gameStop = JSON.parse(localStorage.getItem('gameStop') || '');
    if (!gameStop) {
      this.buttonClick.emit(direction);
    }
  }
}
