import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteproblemComponent } from './admin-deleteproblem.component';

describe('AdminDeleteproblemComponent', () => {
  let component: AdminDeleteproblemComponent;
  let fixture: ComponentFixture<AdminDeleteproblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeleteproblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
