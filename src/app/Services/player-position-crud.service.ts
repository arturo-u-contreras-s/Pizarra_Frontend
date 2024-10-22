import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Squad } from '../model/squad';
import { Player } from '../model/player';
import { PlayerPosition } from '../model/player_position';

import { SquadCrudService } from '../Services/squad-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerPositionCrudService {

  constructor(private http: HttpClient, private squadCrudService: SquadCrudService) {}

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

  deletePlayerPositions(squadId : number) {
    this.http.delete(this.baseUrl + '/squad/' + squadId).pipe(
      catchError(this.handleError('Delete Player Positions')))
    .subscribe(() => {
    });
    console.log("deletePlayerPositions() COMPLETED");
  }

  deletePPByPlayerId(playerId : number) { // delete a player from all squads when the user deletes the player from the database
    this.http.delete(this.baseUrl + '/player/' + playerId).pipe(
      catchError(this.handleError('Delete Player Position by Player ID')))
    .subscribe(() => {
    });
    console.log("deletePPByPlayerId() COMPLETED");
  }

  // delete squad positions and then the squad itself
  deleteEntireSquad(squad : Squad) {
    this.http.delete(this.baseUrl + '/squad/' + squad.squadId).pipe(
      catchError(this.handleError('Delete Entire Squad')))
    .subscribe(() => {
      this.squadCrudService.deleteSquad(squad); // delete squad
    });
    console.log("deletePlayerPositions() COMPLETED");
  }

  private handleError(operation: string) {
    return (error: any): Observable<null> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(null);
    };
  }
}