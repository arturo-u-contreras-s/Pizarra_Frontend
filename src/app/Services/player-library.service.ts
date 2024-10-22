import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerLibraryService {

  private showAddPlayer = new BehaviorSubject<boolean>(false);

  get showAddPlayerGetter() {
    return this.showAddPlayer.asObservable();
  }

  toggleShowAddTeam() {
    this.showAddPlayer.next(!this.showAddPlayer.value);
  }
}