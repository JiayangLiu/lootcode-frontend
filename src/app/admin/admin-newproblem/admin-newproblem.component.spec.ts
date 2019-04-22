import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewproblemComponent } from './admin-newproblem.component';

describe('AdminNewproblemComponent', () => {
  let component: AdminNewproblemComponent;
  let fixture: ComponentFixture<AdminNewproblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewproblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
