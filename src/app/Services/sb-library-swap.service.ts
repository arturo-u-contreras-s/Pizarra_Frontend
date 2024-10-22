/*
POSITIONSWAP COMP AND AVAILABLEPLAYERS COMP USE THIS SERVICE TO COMMUNICATE.
ASSISTS WITH SWAPPING PLAYERS IN AND OUT OF THE CURRENT SQUAD.
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class SbLibrarySwapService {
  private showSquad = new BehaviorSubject<boolean>(true); // display the squad builder screen or the player swap/library screen

  set showSquadSetter(showSquad: boolean) {
    this.showSquad.next(showSquad);
  }

  get showSquadGetter() {
    return this.showSquad.asObservable();
  }

  toggleShowSquad() {
    const currentValue = this.showSquad.value;
    this.showSquad.next(!currentValue);
  }

  private existingPlayerPosition = new BehaviorSubject<number>(null); // position where the player you are swapping out of squad is located at

  set existingPlayerPositionSetter(position: number) {
    this.existingPlayerPosition.next(position);
  }

  get existingPlayerPositionGetter() {
    return this.existingPlayerPosition.asObservable();
  }


  private existingPlayer = new BehaviorSubject<Player>(null); // player you are swapping out of squad

  set existingPlayerSetter(player: Player) {
    this.existingPlayer.next(player);
  }

  get existingPlayerGetter() {
    return this.existingPlayer.asObservable();
  }

  private newPlayer = new BehaviorSubject<Player>(null); // player you are swapping into squad

  set newPlayerSetter(player: Player) {
    this.newPlayer.next(player);
    console.log("New Player Set: ", this.newPlayer.getValue());
  }

  get newPlayerGetter() {
    return this.newPlayer.asObservable();
  }

  newPlayerValueGetter() {
    return this.newPlayer.getValue();
  }
}
