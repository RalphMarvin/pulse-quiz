import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css'],
})
export class GameOverComponent implements OnInit {
  @Input() score?: number;
  @Input() questions?: Array<Question>;

  ngOnInit() {
    this.playAudio();
  }

  playAudio() {
    this.score! <= 5 ? this.playLaughterAudio() : this.playApplauseAudio();
  }

  async playLaughterAudio() {
    let audio = new Audio();
    audio.src = '../assets/audio/shrieking-laughter-104590.mp3';
    audio.load();
    await audio.play();
  }

  async playApplauseAudio() {
    let audio = new Audio();
    audio.src = '../assets/audio/pleased-crowdflac-14484.mp3';
    audio.load();
    await audio.play();
  }
}
