import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Squad } from '../model/squad';

import { PlayerPositionCrudService } from '../Services/player-position-crud.service';

@Injectable({
  providedIn: 'root'
})
export class SquadCrudService {

  constructor(private http: HttpClient, private playerPositionCrudService: PlayerPositionCrudService) {
    this.getAllSquads();
  }

  private activeSquad: BehaviorSubject<Squad | null> = new BehaviorSubject<Squad | null>(null); // the squad chosen to be edited in the squadbuilder

  set activeSquadSetter(squad: Squad) {
    this.activeSquad.next(squad);
  }

  get activeSquadGetter(): Observable<Squad | null> {
    return this.activeSquad.asObservable();
  }
  
  activeSquadValGetter(): Squad | null {
    return this.activeSquad.getValue();
  }


  private allSquads: BehaviorSubject<Squad[]> = new BehaviorSubject<Squad[]>([]); // all the squads that have been created by the user and stored in the database

  get allSquadGetter() {
    return this.allSquads.asObservable();
  }

  /* METHODS USED TO ACCESS BACKEND */

  private baseUrl = 'http://localhost:8080/squads';

  createSquad(squad: Squad) {
    console.log("Creating Squad: ", squad);
    this.http.post(this.baseUrl, squad).pipe(
      catchError(error => {
        console.error('Error creating squad', error);
        return of(null);}))
      .subscribe((resp:any) => {
      this.activeSquadSetter = resp;
      this.getAllSquads(); // Refresh squads after creating a new squad
    });
  }

  /* Create a copy of an existing squad */
  copySquad(squad: Squad, newSquad: Squad) {
    console.log("Creating Squad: ", newSquad);
    this.http.post(this.baseUrl, newSquad).pipe ( // create the new squad
      catchError(error => {
        console.error('Error creating squad', error);
        return of(null);}))
      .subscribe((createdSquad: Squad) => {
      console.log("Creating Squad Response", createdSquad);
      this.playerPositionCrudService.copySquad(squad, createdSquad); // create copies of the player positions from the original squad
      this.getAllSquads(); // Refresh squads after creating a new squad
    });
  }

  getAllSquads() {
    this.http.get<{ [key: string]: Squad }>(this.baseUrl)
      .pipe(
        map(resp => {
          const squads = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              squads.push({ ...resp[key] });
            }
          }
          return squads;}))
          .subscribe(squads => {
        this.allSquads.next(squads); // Update BehaviorSubject with new squads
        console.log("Squads have been received: ", this.allSquads.value)
      });
  }

  updateSquad(squad: Squad) {
    this.http.put(this.baseUrl + '/' + squad.squadId, squad).pipe(
      catchError(error => {
        console.error('Error updating squad', error);
        return of(null);}))
        .subscribe(() => {
      console.log("Squad Updated: ", squad);
      this.getAllSquads(); // Refresh squads after updating a squad
    });
  }

  async deleteSquad(squad: Squad) {
    console.log("Deleting Squad Player Positions: ");
    
    try {
      await this.playerPositionCrudService.deletePlayerPositions(squad.squadId); // Wait for the player positions to be deleted before proceeding
      
      console.log("Deleting: ", squad);
      
      /* delete the squad now that the player positions are deleted */
      this.http.delete(this.baseUrl + '/' + squad.squadId).pipe(
        catchError(error => {
          console.error('Error deleting squad', error);
          return of(null);
        })
      ).subscribe(() => {
        console.log("Deletion Complete: ", squad);
        this.getAllSquads(); // Refresh squads after deleting a squad
      });
  
    } catch (error) {
      console.error('Error occurred while deleting player positions:', error);
    }
  }
}