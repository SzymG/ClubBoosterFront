import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'input-message',
    templateUrl: './input-message.component.html',
    styleUrls: ['./input-message.component.scss'],
})
export class InputMessageComponent implements OnInit {

    @Input() input: FormControl;
    @Input() field: any;

    constructor() { }

    ngOnInit() { }

}
