import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditproblemComponent } from './admin-editproblem.component';

describe('AdminEditproblemComponent', () => {
  let component: AdminEditproblemComponent;
  let fixture: ComponentFixture<AdminEditproblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditproblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
