/*
COMPONENT RESPONSIBLE FOR DISPLAYING ALL OF THE PLAYERS IN THE DATABASE.
IN ADDITION:
CREATE PLAYERS AND MODIFY EXISTING PLAYERS
*/
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../model/player';

import { PlayerLibraryService } from '../Services/player-library.service';
import { FilterPlayersService } from '../Services/filter-players.service';

@Component({
  selector: 'players-comp',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayerLibraryService, FilterPlayersService]
})
export class PlayersComponent implements OnInit {
  constructor (private playerLibraryService: PlayerLibraryService, private filterPlayersService: FilterPlayersService) {}

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.subscriptions.add(this.playerLibraryService.showAddPlayerGetter.subscribe((showAddPlayer: boolean) => {
      this.addPlayer = showAddPlayer;
    }));

    this.subscriptions.add(this.filterPlayersService.goalkeepersGetter.subscribe((players: Player[]) => {
      this.goalkeepers = players;
    }));
    this.subscriptions.add(this.filterPlayersService.defendersGetter.subscribe((players: Player[]) => {
      this.defenders = players;
    }));
    this.subscriptions.add(this.filterPlayersService.midfieldersGetter.subscribe((players: Player[]) => {
      this.midfielders = players;
    }));
    this.subscriptions.add(this.filterPlayersService.forwardsGetter.subscribe((players: Player[]) => {
      this.forwards = players;
    }));

    this.subscriptions.add(this.filterPlayersService.positionFilterGetter.subscribe((position : string) => {
      this.positionFilter = position;
    }));
  }

  positionFilter: string = "";

  // filtered available players by position
  goalkeepers: Player[] = [];
  defenders: Player[] = [];
  midfielders: Player[] = [];
  forwards: Player[] = [];

  addPlayer: boolean = false; // show the component necessary to add a new player

  addPlayerClick() {
    this.playerLibraryService.toggleShowAddTeam();
  }

  playerImg : string = "assets/ui-images/default-player.png";

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}