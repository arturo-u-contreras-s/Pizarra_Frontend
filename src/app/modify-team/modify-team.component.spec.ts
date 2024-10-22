import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTeamComponent } from './modify-team.component';

describe('ModifyTeamComponent', () => {
  let component: ModifyTeamComponent;
  let fixture: ComponentFixture<ModifyTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
