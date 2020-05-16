import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {RequestService} from '../../../services/request/request.service';
import {ToastService} from '../../../services/toast/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-club-asks',
    templateUrl: './club-asks.component.html',
    styleUrls: ['./club-asks.component.scss'],
})
export class ClubAsksComponent implements OnInit {

    loading = true;
    clubId: string;
    usersToAccept: [];

    constructor(
        private readonly modalController: ModalController,
        private readonly request: RequestService,
        private readonly toastService: ToastService,
        private readonly translateService: TranslateService,
        private readonly alertController: AlertController,
        private readonly translate: TranslateService,
    ) {
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/members`).subscribe((response) => {
            // this.club = response;
            this.usersToAccept = response.filter((user) => {
                return user.roles.length === 0;
            });

            console.log('users to accept', this.usersToAccept);
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss();
    }

    async onItemChanged(user) {
        const acceptAlert = await this.alertController.create({
            header: this.translate.instant('ClubPage.giveRole'),
            inputs: [
                {
                    type: 'radio',
                    label: this.translate.instant('Common.player'),
                    value: 'PLAYER',
                    checked: true
                },
                {
                    type: 'radio',
                    label: this.translate.instant('Common.coach'),
                    value: 'COACH'
                }
            ],
            buttons: [
                {
                    text: this.translate.instant('Common.cancel'),
                    role: 'cancel',
                },
                {
                    text: this.translate.instant('Common.confirm'),
                    handler: role => {
                        const body = {
                            member: {
                                roles: [
                                    role
                                ]
                            }
                        };

                        this.request.post(`clubs/${this.clubId}/members/${user.id}/approve`, body).subscribe((response) => {
                            console.log(response);
                            if (response.data) {
                                this.toastService.presentToast(this.translateService.instant('ClubPage.userAdded'));
                                this.ionViewWillEnter();
                            }
                        });
                    }
                }
            ]
        });

        if (user.status === 'accepted') {
            acceptAlert.present();
        } else {
            this.request.delete(`clubs/${this.clubId}/members/${user.id}`).subscribe((response) => {
                if (response.data) {
                    this.toastService.presentToast(this.translateService.instant('ClubPage.userRemoved'));
                    this.ionViewWillEnter();
                }
            });
        }
    }
}
