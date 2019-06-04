import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchMapComponent } from './pitch-map.component';

describe('PitchMapComponent', () => {
  let component: PitchMapComponent;
  let fixture: ComponentFixture<PitchMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
