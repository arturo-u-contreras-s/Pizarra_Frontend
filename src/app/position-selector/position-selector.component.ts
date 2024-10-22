/*
USED BY modify-player COMPONENT TO SELECT THE PLAYERS POSITION 
*/
import { Component, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'position-selector-comp',
  templateUrl: './position-selector.component.html',
  styleUrls: ['./position-selector.component.css']
})
export class PositionSelectorComponent {
  ngOnInit() {
    if (!this.position) {
      this.position = "Goalkeeper";
      this.positionChanged.emit(this.position);
    }
  }

  @Input() position: string = "";
  @Output() positionChanged = new EventEmitter<string>();

  onPositionChanged() {
    this.positionChanged.emit(this.position);
  }
}
