/*
REUSABLE COMPONENT.
DROPDOWN SELECTOR DISPLAYING ALL TEAMS AS OPTIONS.
*/
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../model/player';
import { Team } from '../model/team';
import { TeamCrudService } from '../Services/team-crud.service';

@Component({
  selector: 'team-selector-comp',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.css']
})
export class TeamSelectorComponent {
  constructor(private teamCrudService: TeamCrudService) {}

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.teamCrudService.allTeams$.subscribe(teams => {
      this.allTeams = teams;
      if (this.player && this.player.team) { // do not display an initial team if this component is being used to modify a player
      } else if (this.allTeams.length > 0) { // else the first team in the team DB should be selected on initialization if available
        this.selectedTeam = this.allTeams[0];
        this.teamChanged.emit(this.selectedTeam);
      }
    });
  }

  @Input() player : Player | null = null;
  @Output() teamChanged = new EventEmitter<Team>();

  allTeams: Team[] = [];
  selectedTeam: Team | null;

  onTeamChange() {
    this.teamChanged.emit(this.selectedTeam);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}