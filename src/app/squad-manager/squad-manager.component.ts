/*
DISPLAY ALL SQUADS.
CREATE A NEW SQUAD.
UPDATE OR DELETE AN EXISTING SQUAD. UPDATE TAKES YOU TO THE SQUAD BUILDER.
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Squad } from '../model/squad';

import { FormationSelectorService } from '../Services/formation-selector.service';
import { SquadCrudService } from '../Services/squad-crud.service';
import { PlayerPositionCrudService } from '../Services/player-position-crud.service';

@Component({
  selector: 'squad-manager-comp',
  templateUrl: './squad-manager.component.html',
  styleUrls: ['./squad-manager.component.css']
})
export class SquadManagerComponent {
  constructor(private router: Router, private squadCrudService: SquadCrudService, private formationDataService: FormationSelectorService, private playerPositionCrudService: PlayerPositionCrudService) {}

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.squadCrudService.allSquadGetter.subscribe(squads => {
      this.allSquads = squads;
    });
  }

  addSquad: boolean = false;

  newSquad: Squad;
  squadName: string = "";
  lastUpDate: string = "";

  allSquads: Squad[];

  toggleAddSquad() {
    this.squadName = "";
    this.addSquad = !this.addSquad;
  }

  addSquadClick() {
    this.toggleAddSquad();
  }

  onUpdate(squad: Squad) {
    this.squadCrudService.activeSquadSetter = squad;
    this.formationDataService.selectedFormationSetter = squad.formation;

    this.playerPositionCrudService.getPlayerPositions(squad.squadId);

    this.router.navigate(['squad-builder']);
  }

  onDelete(squad: Squad) {
    this.playerPositionCrudService.deleteEntireSquad(squad);
  }

  onCreate() {
    this.getCurrentDateTime();
    this.newSquad = {
      squadId: null,
      formation: null,
      squadName: this.squadName,
      lastUpDate: this.lastUpDate
    }
    this.squadCrudService.createSquad(this.newSquad);
    this.toggleAddSquad();
    this.router.navigate(['squad-builder']);
  }

  onCancel() {
    this.toggleAddSquad();
  }

  getCurrentDateTime() {
    const now = new Date();
    this.lastUpDate = now.toLocaleDateString();
  }

  squadImg : string = "assets/ui-images/squad.png";

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}