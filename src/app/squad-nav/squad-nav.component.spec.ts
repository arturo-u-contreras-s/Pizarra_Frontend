import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadNavComponent } from './squad-nav.component';

describe('SquadNavComponent', () => {
  let component: SquadNavComponent;
  let fixture: ComponentFixture<SquadNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
