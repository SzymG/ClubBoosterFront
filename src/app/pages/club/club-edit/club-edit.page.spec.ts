import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubEditPage } from './club-edit.page';

describe('ClubEditPage', () => {
  let component: ClubEditPage;
  let fixture: ComponentFixture<ClubEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
