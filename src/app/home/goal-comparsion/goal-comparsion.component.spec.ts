import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalComparsionComponent } from './goal-comparsion.component';

describe('GoalComparsionComponent', () => {
  let component: GoalComparsionComponent;
  let fixture: ComponentFixture<GoalComparsionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalComparsionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalComparsionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
