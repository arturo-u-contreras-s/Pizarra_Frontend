/*
HOUSES ALL THE COMPONENTS NECESSARY TO MAKE THE SQUAD BUILDER FUNCTIONAL
*/

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { SquadBuilderService } from '../Services/squad-builder.service';
import { SbLibrarySwapService } from '../Services/sb-library-swap.service';
import { PlayerPositionCrudService } from '../Services/player-position-crud.service';
import { FormationSelectorService } from '../Services/formation-selector.service';

@Component({
  selector: 'squad-builder-component',
  templateUrl: './squad-builder.component.html',
  styleUrls: ['./squad-builder.component.css'],
  providers: [SquadBuilderService]
})
export class SquadBuilderComponent {
  constructor(private playerPositionCrudService: PlayerPositionCrudService, private sbLibrarySwapService: SbLibrarySwapService, private formationSelectorService: FormationSelectorService) {}

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.sbLibrarySwapService.showSquadGetter.subscribe(showSquad => {
      this.showSquad = showSquad;
    });
  }

  showSquad: boolean = true;

  ngOnDestroy() {
    this.formationSelectorService.resetService();
    this.playerPositionCrudService.resetService();

    this.subscription.unsubscribe();
  }
}