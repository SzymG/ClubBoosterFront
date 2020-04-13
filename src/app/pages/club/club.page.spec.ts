import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubPage } from './club.page';

describe('ClubPage', () => {
  let component: ClubPage;
  let fixture: ComponentFixture<ClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
