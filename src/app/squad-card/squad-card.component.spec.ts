import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadCardComponent } from './squad-card.component';

describe('SquadCardComponent', () => {
  let component: SquadCardComponent;
  let fixture: ComponentFixture<SquadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
