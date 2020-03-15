import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMessageComponent } from './input-message.component';

describe('InputMessageComponent', () => {
    let component: InputMessageComponent;
    let fixture: ComponentFixture<InputMessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputMessageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
