import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Squad } from '../model/squad';

@Injectable({
  providedIn: 'root'
})
export class SquadCrudService {

  constructor(private http: HttpClient) {
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

  deleteSquad(squad: Squad) {
    console.log("Deleting: ", squad)
    this.http.delete(this.baseUrl + '/' + squad.squadId).pipe(
      catchError(error => {
        console.error('Error deleting squad', error);
        return of(null);}))
      .subscribe((resp) => {
      console.log("Deletion Complete: ", squad)
      this.getAllSquads(); // Refresh squads after deleting a squad
    });
  }
}