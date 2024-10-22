import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourFourTwoComponent } from './four-four-two.component';

describe('FourFourTwoComponent', () => {
  let component: FourFourTwoComponent;
  let fixture: ComponentFixture<FourFourTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourFourTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourFourTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
