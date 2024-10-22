/*
GRAPHIC USED TO DISPLAY AVAILABLE PLAYERS IN THE SB LIBRARY.
*/
import { Component, Input } from '@angular/core';

import { Player } from '../model/player';

import { SbLibrarySwapService } from '../Services/sb-library-swap.service';
import { SquadBuilderService } from '../Services/squad-builder.service';

@Component({
  selector: 'player-library-card',
  templateUrl: './player-library-card.component.html',
  styleUrls: ['./player-library-card.component.css']
})
export class PlayerLibraryCardComponent {
  constructor (private sbLibrarySwapService: SbLibrarySwapService, private squadBuilderService: SquadBuilderService) {}

  ngOnInit(): void {
    this.currentPlayer = this.passedPlayer ?? this.placeholderPlayer;
  }

  hovering: boolean = false;

  @Input() passedPlayer: Player;
  currentPlayer: Player;
  newPlayer: Player = null;

  placeholderPlayer: Player = {
    kitNumber: 0,
    firstName: "",
    lastName: "",
    preferredName: "PName",
    position: "POS",
    playerId: null,
    active: false,
    legend: false,
    image: "assets/images/default-player.png",
    birthDate: "",
    joinDate: "",
    releaseDate: "",
    team: null
  }

  handleCardClicked() {
    this.newPlayer = this.sbLibrarySwapService.newPlayerValueGetter();
    if (this.newPlayer && this.newPlayer.playerId !== null) { // add player 1 back to available list
      this.squadBuilderService.addAvailablePlayer(this.newPlayer);
      this.sbLibrarySwapService.newPlayerSetter = null;
    }
    this.sbLibrarySwapService.newPlayerSetter = this.currentPlayer; // set player 2 as new player
    this.squadBuilderService.removeAvailablePlayer(this.currentPlayer.playerId); // remove player 2 from available list
  }
}