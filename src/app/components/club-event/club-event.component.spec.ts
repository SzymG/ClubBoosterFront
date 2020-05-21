import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubEventComponent } from './club-event.component';

describe('ClubEventComponent', () => {
  let component: ClubEventComponent;
  let fixture: ComponentFixture<ClubEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubEventComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
