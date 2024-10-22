/*
REPRESENTS A TEAM IN THE DATABASE.
ALLOWS THE USER TO MODIFY THE TEAMS NAME OR HEAD COACH.
*/
import { Component, Input } from '@angular/core';

import { TeamCrudService } from '../Services/team-crud.service';
import { TeamManagerService } from '../Services/team-manager.service';
import { Team } from '../model/team';

@Component({
  selector: 'modify-team-comp',
  templateUrl: './modify-team.component.html',
  styleUrls: ['./modify-team.component.css']
})
export class ModifyTeamComponent {
  constructor(private teamCrudService: TeamCrudService, private teamManagerService: TeamManagerService) {}

  @Input() team: Team;
  @Input() createTeam: boolean; // create player team or update team mode

  /* temporary team attributes used in case update is not completed */
  headCoach: string = "";
  teamName: string = "";

  ngOnInit() {
    if (this.team) {
      this.headCoach = this.team.teamHeadCoach;
      this.teamName = this.team.teamName
    }
    if (this.createTeam) {
      this.isDisabled = !this.isDisabled;
    }
  }

  onSubmit() {
    if (this.createTeam) {
      this.teamCrudService.createTeam({teamName: this.teamName, teamHeadCoach: this.headCoach});
      this.teamManagerService.toggleShowAddTeam();
    } else { // update team
       const updatedTeam = {
        teamId: this.team.teamId,
        teamName: this.teamName,
        teamHeadCoach: this.headCoach
      }
      this.teamCrudService.updateTeam(updatedTeam)
    }
  }

  onDelete() {
    if (this.team) {
      this.teamCrudService.deleteTeam(this.team)
    }
  }

  modifyTeamClick(team: Team) {
    this.toggleModifyDisabled();
  }

  onCancel() {
    if (this.modify) {
      this.headCoach = this.team.teamHeadCoach;
      this.teamName = this.team.teamName
      this.toggleModifyDisabled();
    } else {
      this.teamManagerService.toggleShowAddTeam();
    }
  }

  toggleModifyDisabled() {
    this.modify = !this.modify;
    this.isDisabled = !this.isDisabled;
  }

  modify: boolean = false; // modify selected existing team
  isDisabled: boolean = true;
}
