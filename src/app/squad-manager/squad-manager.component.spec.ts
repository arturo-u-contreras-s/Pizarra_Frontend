import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadManagerComponent } from './squad-manager.component';

describe('SquadManagerComponent', () => {
  let component: SquadManagerComponent;
  let fixture: ComponentFixture<SquadManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
