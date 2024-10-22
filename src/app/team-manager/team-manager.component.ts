/*
DISPLAYS THE TEAMS IN THE CLUBS DB
*/
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Team } from '../model/team';
import { TeamCrudService } from '../Services/team-crud.service';
import { TeamManagerService } from '../Services/team-manager.service';

@Component({
  selector: 'team-manager-component',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css'],
  providers: [TeamManagerService]
})
export class TeamManagerComponent {
  constructor(private teamCrudService: TeamCrudService, private teamManagerService: TeamManagerService) {}

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.subscriptions.add(this.teamCrudService.allTeams$.subscribe(teams => {
      this.allTeams = teams;
    }));
    this.subscriptions.add(this.teamManagerService.showAddTeam$.subscribe(showAddTeam => {
      this.addTeam = showAddTeam;
    }));
  }
  allTeams: Team[] = [];

  editTeam: boolean = false;
  createTeam: boolean = false;
  addTeam: boolean = false;
  
  modifyTeamClick(team: Team) {
    this.editTeam = true;
  }

  addTeamClick() {
    this.teamManagerService.toggleShowAddTeam();
  }

  teamImg : string = "assets/ui-images/team.png";

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
