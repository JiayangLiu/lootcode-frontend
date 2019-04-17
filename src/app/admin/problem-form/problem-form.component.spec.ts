import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemFormComponent } from './problem-form.component';

describe('ProblemFormComponent', () => {
  let component: ProblemFormComponent;
  let fixture: ComponentFixture<ProblemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
