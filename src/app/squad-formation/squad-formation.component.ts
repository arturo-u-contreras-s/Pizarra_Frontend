/*
CONTAINER WHERE A FORMATION SKELETON WILL BE LOCATED WHEN SELECTED.
*/
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { FormationSelectorService } from '../Services/formation-selector.service';

@Component({
  selector: 'squad-formation-comp',
  templateUrl: './squad-formation.component.html',
  styleUrls: ['./squad-formation.component.css']
})
export class SquadFormationComponent {
  constructor(private formationSelectorService: FormationSelectorService) { }

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.formationSelectorService.selectedFormationGetter.subscribe(
      (formationName: string) => {
        this.selectedFormation = formationName;
      }
    );
  }

  selectedFormation: string = "";

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}