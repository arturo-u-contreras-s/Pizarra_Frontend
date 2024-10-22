import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { Player } from '../model/player';

import { PlayerPositionCrudService } from '../Services/player-position-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerCrudService {
  
  constructor(private http: HttpClient, private playerPositionCrudService: PlayerPositionCrudService) {
    this.populatePlayers();
  }

  private _allPlayers: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);

  get allPlayers$() {
    return this._allPlayers.asObservable();
  }

  private baseUrl = 'http://localhost:8080/players';

  createPlayer(player: Player) {
    this.http.post(this.baseUrl , player).pipe(
      catchError(error => {
        console.error('Error creating player:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.populatePlayers(); // Refresh players after creating a new player
    });
  }

  populatePlayers() {
    console.log("Populating players!");
    this.http.get<{ [key: string]: Player }>(this.baseUrl).pipe(
      map(resp => Object.values(resp)),
      catchError(error => {
        console.error('Error fetching players:', error);
        return throwError(error);
      })
    ).pipe(
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
        this._allPlayers.next(players);
        console.log("Players Populated", this._allPlayers.value);
      });
  }

  updatePlayer(player: Player) {
    this.http.put(this.baseUrl + '/' + player.playerId, player).pipe(
      catchError(error => {
        console.error('Error updating player:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      console.log("Player Updated: ", player);
      this.populatePlayers(); // Refresh players after creating a new player
    });
  }

  deletePlayer(player: Player) {
    this.http.delete(this.baseUrl + '/' + player.playerId).pipe(
      catchError(error => {
        console.error('Error deleting player:', error);
        return throwError(error);
      })
    ).subscribe(() => {
      console.log("Player Deleted: ", player);
      this.populatePlayers(); // Refresh players after deleting a player
      this.playerPositionCrudService.deletePPByPlayerId(player.playerId); // delete player positions associated with the player
    });
  }
}