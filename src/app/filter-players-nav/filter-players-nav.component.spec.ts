import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPlayersNavComponent } from './filter-players-nav.component';

describe('FilterPlayersNavComponent', () => {
  let component: FilterPlayersNavComponent;
  let fixture: ComponentFixture<FilterPlayersNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPlayersNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPlayersNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
