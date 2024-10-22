import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveThreeTwoComponent } from './five-three-two.component';

describe('FiveThreeTwoComponent', () => {
  let component: FiveThreeTwoComponent;
  let fixture: ComponentFixture<FiveThreeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiveThreeTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveThreeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
