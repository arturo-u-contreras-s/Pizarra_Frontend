import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Squad } from '../model/squad';
import { Player } from '../model/player';
import { PlayerPosition } from '../model/player_position';

@Injectable({
  providedIn: 'root'
})
export class PlayerPositionCrudService {

  constructor(private http: HttpClient) {}

  private squadPositions: BehaviorSubject<PlayerPosition[] | null> = new BehaviorSubject<PlayerPosition[] | null>(null); // player positions associated with the selected squad

  set squadPositionsSetter(players: PlayerPosition[]) {
    this.squadPositions.next(players);
  }

  get squadPositionsGetter(): Observable<PlayerPosition[] | null> {
    return this.squadPositions.asObservable();
  }

  activeSquadPositionsGetter(): PlayerPosition[] | null {
    return this.squadPositions.getValue();
  }

  resetService() { // reset the service for the next use
    this.squadPositions.next(null);
  }

  /* METHODS USED TO ACCESS BACKEND */

  private baseUrl = 'http://localhost:8080/player-positions';

  createPlayerPosition(player : PlayerPosition) {
    this.http.post(this.baseUrl , player).pipe(
      catchError(this.handleError('Create Player Position'))
    ).subscribe((resp) => {
      console.log("Create PP API Returned: ", resp);
    });
  }

  getPlayerPositions(squadId : number) {
    this.http.get(this.baseUrl + '/' + squadId)
    .pipe(
      map(resp => {
        const players = [];
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            players.push({ ...resp[key] });
          }
        }
        return players;
      })
    )
    .subscribe(players => {
      this.squadPositionsSetter = players;
    });
  }

  // delete PP associated with this squad
  updateSquad(currentSquad : Squad, squadPlayers : Player[]) {
    this.http.delete(this.baseUrl + '/squad/' + currentSquad.squadId).pipe(
      catchError(this.handleError('Delete Player Positions')))
    .subscribe(() => {
      for (let i = 0; i < squadPlayers.length; i++) { // create new PP in updated squad
        if (squadPlayers[i] != null) {
          this.createPlayerPosition({playerPositionId: null, playerId: squadPlayers[i].playerId, squadPosition: i, squad: currentSquad});
        }
      }
    });
  }

  copySquad(currentSquad : Squad, newSquad : Squad) {
    this.http.get(this.baseUrl + '/' + currentSquad.squadId)
    .pipe(
      map(resp => {
        const players = [];
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            players.push({ ...resp[key] });
          }
        }
        return players;
      })
    )
    .subscribe(players => {
      for (let i = 0; i < players.length; i++) {
        if (players[i] != null) {
          this.createPlayerPosition({playerPositionId: null, playerId: players[i].playerId, squadPosition: players[i].squadPosition, squad: newSquad});
        }
      }
    });
  }

  /* delete all players from a squad using the squadId */
  deletePlayerPositions(squadId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUrl + '/squad/' + squadId).pipe(
        catchError(this.handleError('Delete Player Positions'))
      ).subscribe(() => {
        console.log("deletePlayerPositions() COMPLETED");
        resolve();
      }, error => {
        reject(error);
      });
    });
  }

  /* delete a player from all squads using their id. Use case: when the user deletes the player from the database */
  deletePPByPlayerId(playerId : number) {
    this.http.delete(this.baseUrl + '/player/' + playerId).pipe(
      catchError(this.handleError('Delete Player Position by Player ID')))
    .subscribe(() => {
    });
    console.log("deletePPByPlayerId() COMPLETED");
  }

  private handleError(operation: string) {
    return (error: any): Observable<null> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(null);
    };
  }
}