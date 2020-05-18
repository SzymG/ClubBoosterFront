import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {AlertController, ModalController} from '@ionic/angular';
import {AddGroupComponent} from './components/add-group/add-group.component';
import {TranslateService} from '@ngx-translate/core';
import {ToastService} from '../../../services/toast/toast.service';

@Component({
    selector: 'app-group-management',
    templateUrl: './group-management.page.html',
    styleUrls: ['./group-management.page.scss'],
})
export class GroupManagementPage implements OnInit {
    public loading = true;
    public clubId: string;
    public clubGroups: [];

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly request: RequestService,
        private readonly modalController: ModalController,
        private readonly alertController: AlertController,
        private readonly translateService: TranslateService,
        private readonly toastService: ToastService,
    ) {
        this.clubId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/groups`).subscribe((response) => {
            console.log('club groups', response);

            this.clubGroups = response;
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    async createGroup() {
        const modal = await this.modalController.create({
            component: AddGroupComponent,
            componentProps: {
                clubId: this.clubId,
            }
        });

        modal.onDidDismiss().then((data: any) => {
            if (data.data && data.data.status) {
                this.ionViewWillEnter();
            }
        });

        return await modal.present();
    }

    async deleteGroup(group) {
        const deleteAlert = await this.alertController.create({
            header: this.translateService.instant('ClubPage.deleteGroupConfirm'),
            buttons: [
                {
                    text: this.translateService.instant('Common.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: this.translateService.instant('Common.confirm'),
                    handler: () => {
                        this.loading = true;
                        this.request.delete(`clubs/${this.clubId}/groups/${group.id}`).subscribe((response) => {
                            if (response.data) {
                                this.toastService.presentToast(this.translateService.instant('ClubPage.deleteGroupSuccess'));
                            }
                            this.ionViewWillEnter();
                        });
                    }
                }
            ]
        });

        deleteAlert.present();
    }

    async editGroup(group) {
        const modal = await this.modalController.create({
            component: AddGroupComponent,
            componentProps: {
                clubId: this.clubId,
                scenario: 'edit',
                groupData: group
            }
        });

        modal.onDidDismiss().then((data: any) => {
            if (data.data && data.data.status) {
                this.ionViewWillEnter();
            }
        });

        return await modal.present();
    }
}
