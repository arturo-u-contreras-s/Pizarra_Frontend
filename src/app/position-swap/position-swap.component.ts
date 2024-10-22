/*
PART OF THE SB LIBRARY SWAP SCREEN.
EXCHANGE AN EXISTING SQUAD PLAYER FOR ONE CURRENTLY IN THE AVAILABLE PLAYER LIBRARY
*/
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../model/player';

import { SbLibrarySwapService } from '../Services/sb-library-swap.service';
import { SquadBuilderService } from '../Services/squad-builder.service';

@Component({
  selector: 'position-swap-comp',
  templateUrl: './position-swap.component.html',
  styleUrls: ['./position-swap.component.css']
})
export class PositionSwapComponent {
  constructor(private sbLibrarySwapService: SbLibrarySwapService, private squadBuilderService: SquadBuilderService) {}

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.subscriptions.add(this.sbLibrarySwapService.existingPlayerGetter.subscribe(existingPlayer => {
      this.currentPlayer = existingPlayer;
    }));
    this.subscriptions.add(this.sbLibrarySwapService.existingPlayerPositionGetter.subscribe(position => {
      this.currentPlayerPosition = position;
    }));
    this.subscriptions.add(this.sbLibrarySwapService.newPlayerGetter.subscribe(player => {
      this.newPlayer = player;
    }));
  }

  currentPlayer: Player | null = null;
  currentPlayerPosition: number | null = null;
  
  newPlayer: Player | null = null;


  onCancel() {
    if (this.newPlayer && this.newPlayer.playerId !== null) {
      this.squadBuilderService.addAvailablePlayer(this.newPlayer);
      this.sbLibrarySwapService.newPlayerSetter = null;
    }
    this.sbLibrarySwapService.toggleShowSquad();
  }

  onSwap() {
    if (this.currentPlayer && this.currentPlayer.playerId !== null) { // if old player is not null, add to available players
      this.squadBuilderService.addAvailablePlayer(this.currentPlayer);
    }
    this.squadBuilderService.addSquadPlayer(this.newPlayer, this.currentPlayerPosition); // add new player to squad players list
    this.sbLibrarySwapService.newPlayerSetter = null;
    this.sbLibrarySwapService.toggleShowSquad();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}