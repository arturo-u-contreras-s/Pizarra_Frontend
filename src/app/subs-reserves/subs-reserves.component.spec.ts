import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsReservesComponent } from './subs-reserves.component';

describe('SubsReservesComponent', () => {
  let component: SubsReservesComponent;
  let fixture: ComponentFixture<SubsReservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsReservesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
