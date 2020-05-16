import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListPage } from './member-list.page';

describe('MemberListPage', () => {
  let component: MemberListPage;
  let fixture: ComponentFixture<MemberListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
