import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'user-to-accept',
    templateUrl: './user-to-accept.component.html',
    styleUrls: ['./user-to-accept.component.scss'],
})
export class UserToAcceptComponent implements OnInit {
    @Input() user: any;
    @Output() itemChanged: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    acceptUser() {
        this.itemChanged.emit({...this.user, status: 'accepted'});
    }

    rejectUser() {
        this.itemChanged.emit({...this.user, status: 'rejected'});
    }
}
