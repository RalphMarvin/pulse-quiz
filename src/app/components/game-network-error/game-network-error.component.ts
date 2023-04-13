import { Component } from '@angular/core';

@Component({
  selector: 'app-game-network-error',
  templateUrl: './game-network-error.component.html',
  styleUrls: ['./game-network-error.component.css']
})
export class GameNetworkErrorComponent {
  reconnect() {
    window.location.reload();
  }
}
