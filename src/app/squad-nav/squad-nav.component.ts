/*
DISPLAYS INFO ABOUT THE CURRENT SQUAD BEING BUILT THAT CAN BE MODIFIED AS WELL AS ACTIONS REGARDING THE CURRENT SQUAD.
*/
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Squad } from '../model/squad';

import { FormationSelectorService } from '../Services/formation-selector.service';
import { SquadCrudService } from '../Services/squad-crud.service';
import { SquadBuilderService } from '../Services/squad-builder.service';
import { PlayerPositionCrudService } from '../Services/player-position-crud.service';

@Component({
  selector: 'squad-nav-comp',
  templateUrl: './squad-nav.component.html',
  styleUrls: ['./squad-nav.component.css']
})
export class SquadNavComponent {
  constructor(private router: Router, private formationDataService: FormationSelectorService, private squadBuilderService: SquadBuilderService, private playerPositionCrudService: PlayerPositionCrudService, private squadCrudService: SquadCrudService) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.formationDataService.selectedFormationGetter.subscribe(formation => {
      this.selectedFormation = formation;
    }));
    this.subscriptions.add(this.squadBuilderService.activeSquadGetter.subscribe(squad => {
      this.selectedSquad = squad;
    }));
  }

  selectedFormation: string | null = null;
  selectedSquad: Squad;

  onSelectComponent() {
    this.formationDataService.selectedFormationSetter = this.selectedFormation;
  }

  onSave() {
    this.playerPositionCrudService.updateSquad(this.selectedSquad, this.squadBuilderService.getSquadPlayersValue());

    this.selectedSquad.lastUpDate = this.getCurrentDateTime();
    this.selectedSquad.formation = this.selectedFormation;
    this.squadCrudService.updateSquad(this.selectedSquad);

    this.router.navigate(['squads']);
  }

  onCancel() {
    this.router.navigate(['squads']);
  }

  getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleDateString(); // returns lastUpDate for squads
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}