import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';

@Component({
    selector: 'app-club-announcements',
    templateUrl: './club-announcements.page.html',
    styleUrls: ['./club-announcements.page.scss'],
})
export class ClubAnnouncementsPage implements OnInit {
    loading = true;
    clubId: string;
    clubAnnouncements: string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly request: RequestService,
    ) {
        this.clubId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/announcements`).subscribe((response) => {
            console.log('club announcements', response);
            this.clubAnnouncements = response;
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    getTitle(content) {
        return content.length > 30 ? content.substring(0, 30) + '...' : content;
    }
}
