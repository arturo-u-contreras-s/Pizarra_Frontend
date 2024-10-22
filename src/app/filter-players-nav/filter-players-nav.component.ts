/*
REUSABLE COMPONENT USED TO FILTER PLAYERS BY TEAM, POSITION, AND OTHER ATTRIBUTES
*/
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Team } from '../model/team';
import { Player } from '../model/player';

import { PlayerCrudService } from '../Services/player-crud.service';
import { SquadBuilderService } from '../Services/squad-builder.service';
import { FilterPlayersService } from '../Services/filter-players.service';

@Component({
  selector: 'filter-players-nav',
  templateUrl: './filter-players-nav.component.html',
  styleUrls: ['./filter-players-nav.component.css']
})
export class FilterPlayersNavComponent {
  constructor(private playerCrudService: PlayerCrudService, private squadBuilderService: SquadBuilderService, private filterPlayersService: FilterPlayersService) {}

  private subscription: Subscription = new Subscription();

  ngOnInit() : void {
    if (this.playerLibrary) { // For use in players component
      console.log("Player DB Settings");
      this.subscription = this.playerCrudService.allPlayers$.subscribe((players: Player[]) => {
        this.availablePlayersList = players;
        this.playerFilter();
      });
    } else { // For use in available-players component
      console.log("Available Players Settings");
      this.subscription = this.squadBuilderService.availablePlayers$.subscribe(players => {
        this.availablePlayersList = Array.from(players.values());
        this.playerFilter();
      });
    }
  }

  @Input() playerLibrary : boolean; // differentiate which component it is going to be used in

  availablePlayersList: Player[] = []; // all players stored in database

  // filtered available players by position
  goalkeepers: Player[] = [];
  defenders: Player[] = [];
  midfielders: Player[] = [];
  forwards: Player[] = [];

  filteredTeam: Team | null = null; // display available players only from this team
  positionFilter: string = "All"; // used to display the correct players by position in HTML
  statusFilter: string = "Active"; // Active, Inactive, Legend

  onStatusChange() : void {
    this.playerFilter();
  }

  handleTeamChange(team: Team) : void {
    this.filteredTeam = team;
    this.playerFilter();
  }

  onPositionChange(position: string) : void {
    this.filterPlayersService.positionFilterSetter = position;
  }

  getStatusFilters(): { active?: boolean; legend?: boolean } {
    switch (this.statusFilter) {
      case 'Legend':
        return { legend: true };
      case 'Active':
        return { active: true };
      case 'Inactive':
        return { active: false };
      default:
        return {};
    }
  }

  playerFilter() : void {
    console.log("Available Players to Filter By: ", this.availablePlayersList);
    const statusFilters = this.getStatusFilters();
  
    this.filterPlayersService.goalkeepersSetter = this.filterPlayers(this.availablePlayersList, { position: 'Goalkeeper', ...statusFilters, team: this.filteredTeam });
    this.filterPlayersService.defendersSetter = this.filterPlayers(this.availablePlayersList, { position: 'Defender', ...statusFilters, team: this.filteredTeam });
    this.filterPlayersService.midfieldersSetter = this.filterPlayers(this.availablePlayersList, { position: 'Midfielder', ...statusFilters, team: this.filteredTeam });
    this.filterPlayersService.forwardsSetter = this.filterPlayers(this.availablePlayersList, { position: 'Forward', ...statusFilters, team: this.filteredTeam });
  }

  filterPlayers(players: Player[], criteria: Partial<Player>) : Player[] {
    return players.filter(player => {
      return Object.entries(criteria).every(([key, value]) => {
        if (key === 'team') {
          // Check if value is a Team object
          if (typeof value === 'object' && value !== null && 'teamId' in value) {
            return player.team.teamId === (value as Team).teamId; // Type assertion
          }
          return false; // If value is not a valid Team object, don't match
        }
        return player[key] === value;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}