import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThreeThreeComponent } from './four-three-three.component';

describe('FourThreeThreeComponent', () => {
  let component: FourThreeThreeComponent;
  let fixture: ComponentFixture<FourThreeThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourThreeThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourThreeThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
