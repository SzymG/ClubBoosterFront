import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {RequestService} from '../../../services/request/request.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastService} from '../../../services/toast/toast.service';
import {MemberStatsComponent} from '../member-list/components/member-stats/member-stats.component';

@Component({
    selector: 'app-club-profile',
    templateUrl: './club-profile.component.html',
    styleUrls: ['./club-profile.component.scss'],
})
export class ClubProfileComponent implements OnInit {
    public memberId: string;
    public clubId: string;
    public loading = true;
    public userProfile: any;

    constructor(
        private readonly modalController: ModalController,
        private readonly request: RequestService,
        private readonly alertController: AlertController,
        private readonly translateService: TranslateService,
        private readonly toastService: ToastService,
    ) {
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/members/${this.memberId}`).subscribe((response) => {
            console.log('member profile', response);
            this.userProfile = response;
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    closeModal(data = null) {
        this.modalController.dismiss(data);
    }

    async removeFromClub() {
        const alert = await this.alertController.create({
            header: this.translateService.instant('ClubPage.removeFromClubConfirm'),
            buttons: [
                {
                    text: this.translateService.instant('Common.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: this.translateService.instant('Common.confirm'),
                    handler: () => {
                        this.loading = true;
                        this.request.delete(`clubs/${this.clubId}/members/${this.memberId}`).subscribe((response) => {
                            this.loading = false;
                            this.closeModal({status: 'deleted'});
                            this.toastService.presentToast(this.translateService.instant('ClubPage.removeFromClubSuccess'));
                        });
                    }
                }
            ]
        });

        await alert.present();

    }

    async goToStats() {
        const modal = await this.modalController.create({
            component: MemberStatsComponent,
            componentProps: {
                clubId: this.clubId
            }
        });
        return await modal.present();
    }
}
