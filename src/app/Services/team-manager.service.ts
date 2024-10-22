import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamManagerService {
  private showAddTeam: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get showAddTeam$(): Observable<boolean> {
    return this.showAddTeam.asObservable();
  }

  toggleShowAddTeam(): void {
    this.showAddTeam.next(!this.showAddTeam.value);
  }
}