import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamCrudService {

  constructor(private http: HttpClient) { this.getAllTeams(); }

  private _allTeams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

  get allTeams$() {
    return this._allTeams.asObservable();
  }

  getAllTeamsValue() : Team[] {
    return this._allTeams.getValue();
  }

  private baseUrl = 'http://localhost:8080/teams';

  createTeam(team: { teamName: string, teamHeadCoach: string }) {
    this.http.post(this.baseUrl, team).pipe(
      catchError(error => {
        console.error('Error creating team:', error);
        return of(null);
      }))
    .subscribe(() => {
      this.getAllTeams(); // Refresh teams after creating a new team
    });
  }

  getAllTeams() {
    this.http.get<{ [key: string]: Team }>(this.baseUrl)
      .pipe(
        map(resp => {
          const teams = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              teams.push({ ...resp[key] });
            }
          }
          return teams;
        })
      )
      .subscribe(teams => {
        this._allTeams.next(teams); // Update BehaviorSubject with new teams
        console.log("Teams have been received: ", this._allTeams.value)
      });
  }

  updateTeam(team: Team) {
    this.http.put(this.baseUrl + '/' + team.teamId, team).pipe(
      catchError(error => {
        console.error('Error updating team:', error);
        return of(null);
      })
    ).subscribe(() => {
      console.log("Update Complete: ", team)
      this.getAllTeams(); // Refresh teams after updating a team
    });
  }

  deleteTeam(team: Team) {
    this.http.delete(this.baseUrl + '/' + team.teamId).pipe(
      catchError(error => {
        console.error('Error deleting team:', error);
        return of(null);
      }))
      .subscribe((resp) => {
      console.log("Deletion Complete: ", team)
      this.getAllTeams(); // Refresh teams after deleting a team
    });
  }
}