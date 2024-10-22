import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationSelectorService {

  private selectedFormation = new BehaviorSubject<string>(null);

  set selectedFormationSetter(formation: string) {
    this.selectedFormation.next(formation);
  }

  get selectedFormationGetter() {
    return this.selectedFormation.asObservable();
  }

  get selectedFormationValueGetter() {
    return this.selectedFormation.getValue();
  }

  resetService() {
    this.selectedFormation = new BehaviorSubject<string>(null);
  }
}
