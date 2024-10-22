import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLibraryCardComponent } from './player-library-card.component';

describe('PlayerLibraryCardComponent', () => {
  let component: PlayerLibraryCardComponent;
  let fixture: ComponentFixture<PlayerLibraryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerLibraryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerLibraryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
