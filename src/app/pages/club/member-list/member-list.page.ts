import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.page.html',
    styleUrls: ['./member-list.page.scss'],
})
export class MemberListPage implements OnInit {
    private clubId: string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
    ) {
        this.clubId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
    }

}
