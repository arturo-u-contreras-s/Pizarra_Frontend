/*
HANDLES squadBuilder COMP FUNCTIONALITY
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Player } from '../model/player';
import { Squad } from '../model/squad';
import { PlayerPosition } from '../model/player_position';

import { PlayerCrudService } from '../Services/player-crud.service';
import { PlayerPositionCrudService } from '../Services/player-position-crud.service';
import { SquadCrudService } from '../Services/squad-crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquadBuilderService {
  constructor(private playerCrudService: PlayerCrudService, private playerPositionCrudService: PlayerPositionCrudService, private squadCrudService: SquadCrudService) {
    this.playerCrudService.allPlayers$.subscribe(players => {
      this.allPlayers = players;
      this.allPlayers.forEach(player => {
        this.addAvailablePlayer(player);
      });
    });

    this.squadCrudService.activeSquadGetter.subscribe(squad => {
      this.activeSquadSetter = squad;
    });

    this.playerPositionCrudService.squadPositionsGetter.subscribe(positions => {
      if (positions != null  && this.squadPositions == null) {
        this.squadPositions = positions;
        for (let i = 0; i < this.squadPositions.length; i++) {
          this.positionPlayers.set(this.squadPositions[i].playerId, this.getAvailablePlayer(this.squadPositions[i].playerId));
        }
        this.initializeSquad();
      }
    });
  }
  squadPositions : PlayerPosition[];
  positionPlayers : Map<number, Player> = new Map<number, Player>;

  initializeSquad() {
    if (this.squadPositions && this.squadPositions.length > 0) {
      for (let i = 0; i < this.squadPositions.length; i++) {
        this.addSquadPlayer(this.positionPlayers.get(this.squadPositions[i].playerId), this.squadPositions[i].squadPosition);
        this.removeAvailablePlayer(this.squadPositions[i].playerId);
      }
    }
  }

  allPlayers: Player[] = []; // all players stored in the clubs DB

  /* squad that is currently in use in the squad builder */
  private activeSquad: BehaviorSubject<Squad | null> = new BehaviorSubject<Squad | null>(null);

  set activeSquadSetter(squad: Squad) {
    this.activeSquad.next(squad);
  }

  activeSquadValGetter(): Squad | null {
    return this.activeSquad.getValue();
  }

  get activeSquadGetter(): Observable<Squad | null> {
    return this.activeSquad.asObservable();
  }

  /* players in the database that are marked as active and are not in the current squad */
  private availablePlayers = new BehaviorSubject<Map<number, Player>>(new Map());

  addAvailablePlayer(player: Player) {
    const map = this.availablePlayers.getValue();
    map.set(player.playerId, player);
    this.availablePlayers.next(map);
  }

  getAvailablePlayer(playerId: number): Player | undefined {
    return this.availablePlayers.getValue().get(playerId);
  }

  removeAvailablePlayer(playerId: number) {
    const map = this.availablePlayers.getValue();
    map.delete(playerId);
    this.availablePlayers.next(map);
  }

  get availablePlayers$() {
    return this.availablePlayers.asObservable();
  }

  /* players in the current squad */
  private squadPlayers = new BehaviorSubject<Player[]>(new Array(23));

  addSquadPlayer(player: Player, position: number) {
    const players = this.squadPlayers.getValue();
    players[position] = player;
    this.squadPlayers.next(this.squadPlayers.getValue());
  }

  getSquadPlayer(position: number): Player | undefined {
    const players = this.squadPlayers.getValue();
    return players[position];
  }

  removeSquadPlayer(position: number) {
    const players = this.squadPlayers.getValue();
    players[position] = null;
    this.squadPlayers.next(this.squadPlayers.getValue());
  }

  swapSquadPlayers(player1: Player, position1: number, player2: Player, position2: number) {
    const player: Player = player1;
    const players = this.squadPlayers.getValue();
    if (player2.playerId != null) {
      players[position1] = player2;
    } else {
      players[position1] = null;
    }
    players[position2] = player;
    this.squadPlayers.next(this.squadPlayers.getValue());
  }

  get squadPlayers$() {
    return this.squadPlayers.asObservable();
  }

  getSquadPlayersValue() {
    return this.squadPlayers.getValue();
  }

  /* player previously selected that might need to be swapped */
  private selectedPlayer = new BehaviorSubject<Player | null>(null);

  set selectedPlayerSetter(player: Player) {
    this.selectedPlayer.next(player);
  }

  get selectedPlayerGetter() {
    return this.selectedPlayer.asObservable();
  }

  get selectedPlayerValueGetter() {
    return this.selectedPlayer.getValue();
  }

  /* squad position where the selected player was located at */
  private selectedPosition = new BehaviorSubject<number>(null);

  set selectedPositionSetter(position: number) {
    this.selectedPosition.next(position);
  }

  get selectedPositionGetter() {
    return this.selectedPosition.asObservable();
  }

  get selectedPositionValueGetter() {
    return this.selectedPosition.getValue();
  }

  resetSelectedPlayer() {
    this.selectedPlayer.next(null);
    this.selectedPosition.next(null);
  }

  createPlayerPositions() { // squad is being saved, save the locations where the players are in the squad
    for (let i = 0; i < this.squadPlayers.getValue().length; i++) {
      if (this.squadPlayers.getValue()[i] != null) {
        this.playerPositionCrudService.createPlayerPosition({playerPositionId: null, playerId: this.squadPlayers.getValue()[i].playerId, squadPosition: i, squad: this.activeSquadValGetter()});
      }
    }
  }
}