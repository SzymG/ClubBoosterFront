import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubAsksComponent } from './club-asks.component';

describe('ClubAsksComponent', () => {
  let component: ClubAsksComponent;
  let fixture: ComponentFixture<ClubAsksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubAsksComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubAsksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
