/*
COMPONENT RESPONSIBLE FOR DISPLAYING AVAILABLE PLAYERS IN SB.
*/
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../model/player';

import { FilterPlayersService } from '../Services/filter-players.service';

@Component({
  selector: 'available-players-comp',
  templateUrl: './available-players.component.html',
  styleUrls: ['./available-players.component.css'],
  providers: [FilterPlayersService]
})
export class AvailablePlayersComponent {
  constructor(private filterPlayersService: FilterPlayersService) {}

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.filterPlayersService.goalkeepersGetter.subscribe(
        players => { this.goalkeepers = players; },
        error => { console.error('Error fetching goalkeepers', error); }
      )
    );
    this.subscriptions.add(
      this.filterPlayersService.defendersGetter.subscribe(
        players => { this.defenders = players; },
        error => { console.error('Error fetching defenders', error); }
      )
    );
    this.subscriptions.add(
      this.filterPlayersService.midfieldersGetter.subscribe(
        players => { this.midfielders = players; },
        error => { console.error('Error fetching midfielders', error); }
      )
    );
    this.subscriptions.add(
      this.filterPlayersService.forwardsGetter.subscribe(
        players => { this.forwards = players; },
        error => { console.error('Error fetching forwards', error); }
      )
    );

    this.subscriptions.add(
      this.filterPlayersService.positionFilterGetter.subscribe(
        position => { this.positionFilter = position; },
        error => { console.error('Error fetching position filter', error); }
      )
    );
  }

  // filtered available players by position
  goalkeepers: Player[] = [];
  defenders: Player[] = [];
  midfielders: Player[] = [];
  forwards: Player[] = [];

  positionFilter: string = "";

  showFilters: boolean = true;

  toggleShowFilters() {
    this.showFilters = !this.showFilters;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
