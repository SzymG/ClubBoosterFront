import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {TranslateService} from '@ngx-translate/core';
import plLocale from '@fullcalendar/core/locales/pl';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {CreateAnnouncementComponent} from '../create-announcement/create-announcement.component';
import {CreateEventComponent} from '../create-event/create-event.component';
import {ClubAsksComponent} from '../club-asks/club-asks.component';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {ToastService} from '../../../services/toast/toast.service';
import {EventAlertComponent} from '../../../components/event-alert/event-alert.component';

@Component({
    selector: 'app-club-dashboard',
    templateUrl: './club-dashboard.page.html',
    styleUrls: ['./club-dashboard.page.scss'],
})
export class ClubDashboardPage implements OnInit {

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;

    calendarPlugins = [dayGridPlugin];
    locales = [plLocale];
    clubEvents: [];
    loading = true;
    private clubId: string;
    private club: any;

    constructor(
        private readonly modalController: ModalController,
        private readonly activatedRoute: ActivatedRoute,
        private readonly request: RequestService,
        private readonly translateService: TranslateService,
        private readonly clipboard: Clipboard,
        private readonly toastService: ToastService,
        private readonly alertController: AlertController,
        private readonly navCtrl: NavController,
        private readonly eventAlert: EventAlertComponent,
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.clubId = this.activatedRoute.snapshot.paramMap.get('id');

        try {
            this.request.get('clubs/' + this.clubId + '/events').subscribe((response) => {
                console.log('club events', response);
                this.clubEvents = response;
            });

            this.request.get('clubs/' + this.clubId).subscribe((response) => {
                this.club = response;
                console.log('club', response);
                this.loading = false;
            });

        } catch (e) {
            console.error(e);
            this.loading = false;
        }
    }

    eventClickHandler(event) {
        this.eventAlert.present(event.event);
    }

    get isPresident() {
        return this.club && this.club.member_roles && this.club.member_roles.includes('PRESIDENT');
    }

    get isCoachOrPresident() {
        return this.club && this.club.member_roles &&
            (this.club.member_roles.includes('PRESIDENT') || this.club.member_roles.includes('COACH'));
    }

    async createAnnouncement() {
        const modal = await this.modalController.create({
            component: CreateAnnouncementComponent,
            componentProps: {
                clubId: this.clubId
            }
        });
        return await modal.present();
    }

    async createEvent() {
        const modal = await this.modalController.create({
            component: CreateEventComponent,
            componentProps: {
                clubId: this.clubId
            }
        });

        modal.onDidDismiss().then((data: any) => {
            console.log(data);
            if (data.data && data.data.status) {
                this.ionViewWillEnter();
            }
        });

        return await modal.present();
    }

    async showAsks() {
        const modal = await this.modalController.create({
            component: ClubAsksComponent,
            componentProps: {
                clubId: this.clubId
            }
        });
        return await modal.present();
    }

    copyToken() {
        this.clipboard.copy(this.club.token);
        this.toastService.presentToast(this.translateService.instant('ClubPage.tokenCopied'));
    }

    async leaveClub() {
        const rejectAlert = await this.alertController.create({
            header: this.translateService.instant('ClubPage.leaveConfirm'),
            buttons: [
                {
                    text: this.translateService.instant('Common.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: this.translateService.instant('Common.confirm'),
                    handler: () => {
                        this.request.delete(`clubs/${this.clubId}/leave`).subscribe((response) => {
                            if (response.data) {
                                this.navCtrl.back();
                                this.toastService.presentToast(this.translateService.instant('ClubPage.leaveSuccess'));
                            }
                        });
                    }
                }
            ]
        });

        rejectAlert.present();
    }
}
