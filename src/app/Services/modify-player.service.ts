/*
WORKS WITH PLAYERENTRY COMP TO PASS INFORMATION ABOUT AN EDITED PLAYER BETWEEN PLAYERCARD COMP AND MODIFYPLAYER COMP.
ITS MAIN PURPOSE IT TO SHOW THE USER WHAT THEIR CHANGES TO A PLAYER WOULD LOOK LIKE BEFORE CREATING OR UPDATING THE PLAYER.
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class ModifyPlayerService {
  private tempPlayer = new BehaviorSubject<Player>({
    kitNumber: 0,
    firstName: "",
    lastName: "",
    preferredName: "",
    position: "",
    playerId: null,
    active: true,
    legend: false,
    image: "assets/ui-images/default-player.png",
    birthDate: "",
    joinDate: "",
    releaseDate: "",
    team: null
  }); // the version of the player that is being edited and passed between playercard and modifyplayer components

  set tempPlayerSetter(tempPlayer: Player) {
    this.tempPlayer.next(tempPlayer);
  }

  get tempPlayerGetter() {
    return this.tempPlayer.asObservable();
  }

  /* UI FUNCTIONALITY */
  private modifyView = new BehaviorSubject<boolean>(false); // SHOW MODIFYPLAYER COMPONENT

  set modifyViewSetter(modifyView: boolean) {
    this.modifyView.next(modifyView);
  }

  get modifyViewGetter() {
    return this.modifyView.asObservable();
  }

  toggleModifyView() {
    this.modifyView.next(!this.modifyView.getValue());
  }
}