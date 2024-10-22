/*
COMMUNICATE BETWEEN filter-players-nav COMPONENT AND ITS PARENT COMPONENT TO DISPLAY THE FILTERED PLAYERS
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class FilterPlayersService {
  /* filtered available players by position */
  private goalkeepers = new BehaviorSubject<Player[]>([]);

  set goalkeepersSetter(players : Player[]) {
    this.goalkeepers.next(players);
  }

  get goalkeepersGetter() {
    return this.goalkeepers.asObservable();
  }

  private defenders = new BehaviorSubject<Player[]>([]);

  set defendersSetter(players : Player[]) {
    this.defenders.next(players);
  }

  get defendersGetter() {
    return this.defenders.asObservable();
  }

  private midfielders = new BehaviorSubject<Player[]>([]);

  set midfieldersSetter(players : Player[]) {
    this.midfielders.next(players);
  }

  get midfieldersGetter() {
    return this.midfielders.asObservable();
  }

  private forwards = new BehaviorSubject<Player[]>([]);

  set forwardsSetter(players : Player[]) {
    this.forwards.next(players);
  }

  get forwardsGetter() {
    return this.forwards.asObservable();
  }

  private positionFilter = new BehaviorSubject<string>("All"); // relay which position the user would like to filter by

  set positionFilterSetter(position : string) {
    this.positionFilter.next(position);
  }

  get positionFilterGetter() {
    return this.positionFilter.asObservable();
  }
}
