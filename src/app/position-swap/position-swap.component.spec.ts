import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSwapComponent } from './position-swap.component';

describe('PositionSwapComponent', () => {
  let component: PositionSwapComponent;
  let fixture: ComponentFixture<PositionSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionSwapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
