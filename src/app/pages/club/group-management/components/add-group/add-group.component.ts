import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ToastService} from '../../../../../services/toast/toast.service';
import {RequestService} from '../../../../../services/request/request.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-add-group',
    templateUrl: './add-group.component.html',
    styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
    public groupName: string;
    public clubId: string;
    public selectedUserIds: [];
    private clubUsers: [];
    private userCheckboxes;

    constructor(
        private readonly modalController: ModalController,
        private readonly alertController: AlertController,
        private readonly translateService: TranslateService,
        private readonly toastService: ToastService,
        private readonly request: RequestService,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/members`).subscribe((response) => {
            this.clubUsers = response.filter((user) => {
                return user.roles.length !== 0;
            });

            this.getUsersCheckboxes();
        });
    }

    closeModal(data = null) {
        this.modalController.dismiss(data);
    }

    async addUsersToGroup() {
        const alert = await this.alertController.create({
            header: this.translateService.instant('ClubPage.chooseUsers'),
            inputs: this.userCheckboxes,
            buttons: [
                {
                    text: this.translateService.instant('Common.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: this.translateService.instant('Common.confirm'),
                    handler: (selectedUsers) => {
                        this.selectedUserIds = selectedUsers;
                        this.getUsersCheckboxes();
                    }
                }
            ]
        });

        await alert.present();
    }

    addGroup() {
        const body = {
            group: {
                name: this.groupName,
                members_ids: this.selectedUserIds
            }
        };

        this.request.post(`clubs/${this.clubId}/groups`, body).subscribe((response) => {
            console.log(response);
            if (response.data) {
                this.toastService.presentToast(this.translateService.instant('ClubPage.groupAddSuccess'));
                this.closeModal({status: 'success'});
            }
        });
    }

    private getUsersCheckboxes() {
        this.userCheckboxes = this.clubUsers.map((user: any) => {
            const userId = user.id;
            const isChecked = this.selectedUserIds && this.selectedUserIds.includes(userId as never);
            return {
                type: 'checkbox',
                label: user.name && user.surname ? user.name + ' ' + user.surname :
                    this.translateService.instant('ClubPage.anonymusUser'),
                value: user.id,
                checked: isChecked
            };
        });
    }
}
