/*
PART OF THE SB LIBRARY SWAP SCREEN.
EXCHANGE AN EXISTING SQUAD PLAYER FOR ONE CURRENTLY IN THE AVAILABLE PLAYER LIBRARY
*/

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../model/player';

import { SbLibrarySwapService } from '../Services/sb-library-swap.service';
import { SquadBuilderService } from '../Services/squad-builder.service';
import { FormationSelectorService } from '../Services/formation-selector.service';

@Component({
  selector: 'position-swap-comp',
  templateUrl: './position-swap.component.html',
  styleUrls: ['./position-swap.component.css']
})
export class PositionSwapComponent {
  constructor(private sbLibrarySwapService: SbLibrarySwapService, private squadBuilderService: SquadBuilderService, private formationSelectorService: FormationSelectorService) {}

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.subscriptions.add(this.sbLibrarySwapService.existingPlayerPositionGetter.subscribe(position => {
      this.currentPlayerPosition = position;
    }));
    this.subscriptions.add(this.sbLibrarySwapService.newPlayerGetter.subscribe(player => {
      this.newPlayer = player;
    }));
    this.subscriptions.add(this.squadBuilderService.squadPlayers$.subscribe(players => {
      this.squadPlayers = players;
    }));
    this.subscriptions.add(this.formationSelectorService.selectedFormationGetter.subscribe(formation => {
      if (formation) {
        this.setPositionArray(formation);
      }
    }));

    this.setPositionTitle();
  }

  currentPlayerPosition: number | null = null;
  currentPositionTitle: string | null = null;

  squadPlayers: Player[] | null = null;

  positionTitles: string[] | null = null;
  fourThreeThree: string[] = ["GK", "CB", "CB", "LB", "RB", "CM", "CM", "CM", "LW", "RW", "ST"];
  fourFourTwo: string[] = ["GK", "CB", "CB", "LB", "RB", "CM", "CM", "RM", "LM", "ST", "ST"];
  fiveThreeTwo: string[] = ["GK", "CB", "CB", "CB", "LWB", "RWB", "CAM", "CM", "CM", "ST", "ST"];
  subsReserves: readonly string[] = ["SUB 1", "SUB 2", "SUB 3", "SUB 4", "SUB 5", "SUB 6", "RES 1", "RES 2", "RES 3", "RES 4", "RES 5", "RES 6"];

  newPlayer: Player | null = null;

  onSwap() {
    if (this.squadPlayers[this.currentPlayerPosition] && this.squadPlayers[this.currentPlayerPosition].playerId !== null) { // if old player is not null, add to available players
      this.squadBuilderService.addAvailablePlayer(this.squadPlayers[this.currentPlayerPosition]);
    }
    this.squadBuilderService.addSquadPlayer(this.newPlayer, this.currentPlayerPosition); // add new player to squad players list
    this.sbLibrarySwapService.newPlayerSetter = null;
  }

  scrollLeft() {
    this.currentPlayerPosition--;
    if (this.currentPlayerPosition < 0) {
      this.currentPlayerPosition = 22;
    }
    this.setPositionTitle();
  }

  scrollRight() {
    this.currentPlayerPosition++;
    if (this.currentPlayerPosition > 22) {
      this.currentPlayerPosition = 0;
    }
    this.setPositionTitle();
  }

  setPositionTitle() {
    if (this.currentPlayerPosition > 10) {
      this.currentPositionTitle = this.subsReserves[this.currentPlayerPosition - 11];
    } else {
      this.currentPositionTitle = this.positionTitles[this.currentPlayerPosition];
    }
  }

  goToSquad() {
    this.sbLibrarySwapService.toggleShowSquad();
  }

  setPositionArray(formation : string) {
    if (formation == "four-three-three-comp") {
      this.positionTitles = this.fourThreeThree;
    } else if (formation == "four-four-two-comp") {
      this.positionTitles = this.fourFourTwo;
    } else {
      this.positionTitles = this.fiveThreeTwo;
    }
  }

  defaultPlayerImg : string = "assets/ui-images/default-player.png";

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}