import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubAsksPage } from './club-asks.page';

describe('ClubAsksPage', () => {
  let component: ClubAsksPage;
  let fixture: ComponentFixture<ClubAsksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubAsksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubAsksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
