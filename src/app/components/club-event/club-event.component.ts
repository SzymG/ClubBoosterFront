import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {RequestService} from '../../services/request/request.service';
import {ToastService} from '../../services/toast/toast.service';

@Component({
    selector: 'app-club-event',
    templateUrl: './club-event.component.html',
    styleUrls: ['./club-event.component.scss'],
})
export class ClubEventComponent implements OnInit {

    clubId: string;
    eventId: string;
    loading = true;
    event: any;
    source: string;
    playersLoading = true;
    totalBySource: number;
    private clubUsers: any;

    constructor(
        private readonly modalController: ModalController,
        private readonly request: RequestService,
        private readonly toastService: ToastService,
        public translateService: TranslateService,
    ) {
        this.source = 'approved';
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/events/${this.eventId}`).subscribe((response) => {
            console.log('event', response);
            this.event = response;
            this.loading = false;
        });

        this.request.get(`clubs/${this.clubId}/members`).subscribe((response) => {
            this.clubUsers = response.filter((user) => {
                return user.roles.length !== 0;
            });

            this.playersLoading = false;
        });
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss();
    }

    getDate(date: string, withHours: boolean) {
        const dateT = new Date(date);

        const dateFormat = `${dateT.getDate()}.${dateT.getMonth() + 1}.${dateT.getFullYear()}`;

        if (!withHours) {
            return dateFormat;
        } else {
            const hours = dateT.getHours().toString().length ?
                '' + (dateT.getHours().toString().length === 1 ? '0' + dateT.getHours() : dateT.getHours()) : '';
            const minutes = dateT.getMinutes().toString().length ?
                '' + (dateT.getMinutes().toString().length === 1 ? '0' + dateT.getMinutes() : dateT.getMinutes()) : '';

            return `${dateFormat} ${hours}:${minutes}`;
        }
    }

    getUsersBySource() {
        let users: [];
        let participantFilter: any;

        switch (this.source) {
            case 'approved':
                participantFilter = true;
                break;
            case 'undecided':
                participantFilter = null;
                break;
            case 'cantBe':
                participantFilter = false;
                break;
        }

        users = this.clubUsers.filter((user) => {
            return this.event.participants[user.id] === participantFilter;
        });
        this.totalBySource = users.length;
        return users;
    }

    confirmPresence(canBe: boolean) {
        this.loading = true;
        const body = {
            presence: canBe
        };

        this.request.post(`clubs/${this.clubId}/events/${this.eventId}/presence`, body).subscribe((response) => {
            if (response.data) {
                this.toastService.presentToast(
                    this.translateService.instant('ClubPage.' + (canBe ? 'eventConfirmPresenceSuccess' : 'eventConfirmAbsenceSuccess')));
                this.ionViewWillEnter();
            }
        });
    }
}
