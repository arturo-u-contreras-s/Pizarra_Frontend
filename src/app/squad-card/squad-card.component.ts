/*
CHILD BELONGING TO SQUAD BUILDER COMPONENT.
DISPLAYS EACH PLAYER IN THE CURRENT SQUAD USING squadPlayers[].
HANDLES PLAYER ADDITIONS, REMOVALS, AND SWAPS WITHIN THE SQUAD.
*/

import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../model/player';

import { SbLibrarySwapService } from '../Services/sb-library-swap.service';
import { SquadBuilderService } from '../Services/squad-builder.service';

@Component({
  selector: 'squad-card-comp',
  templateUrl: './squad-card.component.html',
  styleUrls: ['./squad-card.component.css']
})
export class SquadCardComponent implements OnInit {
  constructor(private sbLibrarySwapService: SbLibrarySwapService, private squadBuilderService: SquadBuilderService) {}

  private subscriptions: Subscription = new Subscription();

  @Input() squadPosition: number;

  ngOnInit(): void {
    this.subscriptions.add(this.squadBuilderService.selectedPositionGetter.subscribe(position => {
      this.selectedPosition = position;
    }));

    this.subscriptions.add(this.squadBuilderService.squadPlayers$.subscribe(players => {
      this.squadPlayers = players;
      if (this.squadPlayers[this.squadPosition]) {
        this.currentPlayer = this.squadPlayers[this.squadPosition];
        this.currentPlayerPosition = this.positionMapping[this.currentPlayer.position] || null;
      } else {
        this.currentPlayer = this.placeholderPlayer;
        this.currentPlayerPosition = null;
      }
    }));
  }

  private positionMapping = {
    'Forward': 'FWD',
    'Midfielder': 'MID',
    'Defender': 'DEF',
    'Goalkeeper': 'GK'
  };

  squadPlayers: Player[];
  currentPlayer: Player;
  currentPlayerPosition: string; // used to display the players position(shortened) on his card

  selectedPosition : number; // save the squad position of this card when clicked in case of a future card swap

  placeholderPlayer: Player = {
    kitNumber: null,
    firstName: "",
    lastName: "",
    preferredName: "",
    position: "",
    playerId: null,
    active: false,
    legend: false,
    image: "assets/ui-images/default-player.png",
    birthDate: "",
    joinDate: "",
    releaseDate: "",
    team: null
  }

  onSwapClicked() {
    this.squadBuilderService.resetSelectedPlayer();
    this.sbLibrarySwapService.existingPlayerSetter = this.currentPlayer;
    this.sbLibrarySwapService.existingPlayerPositionSetter = this.squadPosition;
    this.sbLibrarySwapService.toggleShowSquad();
  }

  onRemoveClicked() {
    this.squadBuilderService.addAvailablePlayer(this.currentPlayer); // add player to available players
    this.squadBuilderService.removeSquadPlayer(this.squadPosition);// remove player from squad players
  }

  onCardClicked() {
    if (this.squadBuilderService.selectedPlayerValueGetter == null) { // first player selected
      if (this.currentPlayer.playerId != null) { // active player
        this.squadBuilderService.selectedPlayerSetter = this.currentPlayer;
        this.squadBuilderService.selectedPositionSetter = this.squadPosition;
      }
      // do nothing if a default player is clicked first
    } else { // second player selected
      this.squadBuilderService.swapSquadPlayers(this.squadBuilderService.selectedPlayerValueGetter, this.squadBuilderService.selectedPositionValueGetter, this.currentPlayer, this.squadPosition);
      this.squadBuilderService.resetSelectedPlayer();
    }
  }

  hovering: boolean = false;

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}