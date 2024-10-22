/*
SERVES AS A CONTAINER TO PLAYERCARD COMP WHICH DISPLAYS A PLAYER IN THE DATABASE.
IF A PLAYER IS BEING CREATED OR A PLAYER IS BEING MODIFIED THIS COMPONENT WILL ALSO SHOW MODIFYPLAYER COMP WHICH ALLOWS THE USER TO UPDATED PLAYER INFO.
*/
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../model/player';
import { ModifyPlayerService } from '../Services/modify-player.service';

@Component({
  selector: 'player-entry-comp',
  templateUrl: './player-entry.component.html',
  styleUrls: ['./player-entry.component.css'],
  providers: [ModifyPlayerService]
})
export class PlayerEntryComponent {

  constructor (private modifyPlayerService: ModifyPlayerService) {}

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.modifyPlayerService.modifyViewGetter.subscribe(
      (viewState: boolean) => { this.modifyView = viewState; });
    
    if (this.createPlayer) {
      this.modifyPlayerService.modifyViewSetter = true;
    }
    if (this.currentPlayer) {
      this.modifyPlayerService.tempPlayerSetter = this.currentPlayer;
    }
  }

  @Input() createPlayer: boolean;
  
  @Input() currentPlayer: Player;

  modifyView: boolean = true;

  toggleModifyView() {
    this.modifyPlayerService.toggleModifyView();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}