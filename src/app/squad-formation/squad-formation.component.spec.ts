import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadFormationComponent } from './squad-formation.component';

describe('SquadFormationComponent', () => {
  let component: SquadFormationComponent;
  let fixture: ComponentFixture<SquadFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadFormationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
