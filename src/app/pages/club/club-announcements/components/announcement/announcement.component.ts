import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RequestService} from '../../../../../services/request/request.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-announcement',
    templateUrl: './announcement.component.html',
    styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
    announcementId: string;
    clubId: string;
    loading = true;
    private announcement: any;

    constructor(
        private readonly modalController: ModalController,
        private readonly request: RequestService,
        public translateService: TranslateService,
    ) {
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/announcements/${this.announcementId}`).subscribe((response) => {
            console.log('announcement', response);
            this.announcement = response;
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss();
    }

    getDateCreation() {
        const date = new Date(this.announcement.date_creation);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
}
