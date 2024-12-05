/*
THIS COMPONENT SERVES AS A FORM TO ENTER PLAYER INFORMATION.
WORKS WITH PLAYERCARD COMP TO DISPLAY THE INFORMATION IN THIS COMPONENT TO THE USER. THE INFORMATION IS PASSED TO PLAYERCARD COMP VIA MODIFYPLAYER SERVICE.
*/
import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player } from '../model/player';
import { Team } from '../model/team';

import { PlayerCrudService } from '../Services/player-crud.service';
import { PlayerLibraryService} from '../Services/player-library.service';
import { ModifyPlayerService } from '../Services/modify-player.service';
import { TeamCrudService } from '../Services/team-crud.service';

@Component({
  selector: 'modify-player-comp',
  templateUrl: './modify-player.component.html',
  styleUrls: ['./modify-player.component.css']
})
export class ModifyPlayerComponent {
  constructor(private teamCrudService: TeamCrudService, private playerCrudService: PlayerCrudService, private playerLibraryService: PlayerLibraryService, private modifyPlayerService: ModifyPlayerService) {}

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.subscriptions.add(this.modifyPlayerService.tempPlayerGetter.subscribe(player => {
      this.currentPlayer = player;
      if (!this.originalPlayer) {
        this.originalPlayer = this.clonePlayer(this.currentPlayer); // save a copy of the player
      }
    }));

    this.subscriptions.add(this.teamCrudService.allTeams$.subscribe(teams => {
      this.allTeams = teams;
    }));
  }

  ngOnChanges(changes: SimpleChanges) { // keep the player updated in the service after its attributes are altered
    if (changes['currentPlayer']) {
      this.modifyPlayerService.tempPlayerSetter = this.currentPlayer;
    }
  }

  allTeams: Team[] = [];

  @Input() createPlayer: boolean;

  originalPlayer: Player; // version of the player stored in database. stored in case user wants to cancel changes made

  currentPlayer: Player; // version of the player being edited

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.currentPlayer.image = "assets/player-images/" + file.name;
    }
  }

  handleTeamChange(team: Team) {
    this.currentPlayer.team = team;
  }

  handlePositionChange(position: string) {
    this.currentPlayer.position = position;
  }

  onSubmit() {
    if (this.createPlayer) {
      this.playerCrudService.createPlayer(this.currentPlayer);
      this.playerLibraryService.toggleShowAddTeam();
    } else { // update player
      this.playerCrudService.updatePlayer(this.currentPlayer);
    }
  }

  onCancel() {
    if (this.createPlayer) {
      this.playerLibraryService.toggleShowAddTeam();
    } else { // cancel updating the player - revert changes
      this.modifyPlayerService.tempPlayerSetter = this.originalPlayer;
      this.modifyPlayerService.toggleModifyView();
    }
  }

  onDelete() {
    if (this.currentPlayer) {
      this.modifyPlayerService.tempPlayerSetter = this.originalPlayer;
      this.playerCrudService.deletePlayer(this.currentPlayer);
    }
  }

  private clonePlayer(player: Player): Player { // create a deep copy of a player
    return JSON.parse(JSON.stringify(player));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}