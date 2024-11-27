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

  squadName: string = "";
  lastUpDate: string = "";
  selectedFormation: string | null = "four-three-three-comp";

  allSquads: Squad[];

  isNameEntered: boolean = false;

  onSquadNameChange(newValue: string) {
    if (this.squadName != "") {
      this.isNameEntered = true;
    } else {
      this.isNameEntered = false;
    }
  }

  toggleAddSquad() {
    this.squadName = "";
    this.addSquad = !this.addSquad;
    this.selectedFormation = "four-three-three-comp";
    this.isNameEntered = false
  }

  addSquadClick() {
    this.toggleAddSquad();
  }

  onCopy(squad: Squad) {
    this.getCurrentDateTime();
    const newSquad: Squad = {
      squadId: null,
      formation: squad.formation,
      squadName: squad.squadName + " COPY",
      lastUpDate: this.lastUpDate
    }

    this.squadCrudService.copySquad(squad, newSquad);
  }

  onUpdate(squad: Squad) {
    this.squadCrudService.activeSquadSetter = squad;
    this.formationDataService.selectedFormationSetter = squad.formation;

    this.playerPositionCrudService.getPlayerPositions(squad.squadId);

    this.router.navigate(['squad-builder']);
  }

  onDelete(squad: Squad) {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (!isConfirmed) {
      return;
    }
    this.squadCrudService.deleteSquad(squad);
  }

  onCreate() {
    this.getCurrentDateTime();
    const newSquad = {
      squadId: null,
      formation: this.selectedFormation,
      squadName: this.squadName,
      lastUpDate: this.lastUpDate
    }
    this.squadCrudService.createSquad(newSquad);
    this.formationDataService.selectedFormationSetter = newSquad.formation;
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