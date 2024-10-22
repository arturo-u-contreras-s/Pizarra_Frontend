/*
GRAPHIC USED TO DISPLAY EVERY PLAYER IN THE DATABASE.
THIS COMPONENT IS CAPABLE OF SHOWING UPDATES TO ITS ASSIGNED PLAYER IN REAL TIME VIA COLLABORATION WITH PLAYERCARD COMP AND MODIFYPLAYER SERVICE.
*/
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../model/player';

import { ModifyPlayerService } from '../Services/modify-player.service';

@Component({
  selector: 'player-card-comp',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {
  constructor(private modifyPlayerService: ModifyPlayerService) {}

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.modifyPlayerService.tempPlayerGetter.subscribe(player => {
      this.currentPlayer = player;
    });
  }

  currentPlayer: Player | null = null;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
