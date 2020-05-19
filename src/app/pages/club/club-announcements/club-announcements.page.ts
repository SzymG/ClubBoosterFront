import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {AddGroupComponent} from '../group-management/components/add-group/add-group.component';
import {ModalController} from '@ionic/angular';
import {AnnouncementComponent} from './components/announcement/announcement.component';

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
        private readonly modalController: ModalController,
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

    async openAnnouncement(announcement) {
        const modal = await this.modalController.create({
            component: AnnouncementComponent,
            componentProps: {
                clubId: this.clubId,
                announcementId: announcement.id,
            }
        });

        return await modal.present();
    }

    getDate(announcement) {
        const date = new Date(announcement.date_creation);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
}
