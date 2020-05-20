import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RequestService} from '../../../services/request/request.service';
import {ToastService} from '../../../services/toast/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-create-announcement',
    templateUrl: './create-announcement.component.html',
    styleUrls: ['./create-announcement.component.scss'],
})
export class CreateAnnouncementComponent implements OnInit {
    source: string;
    selectedUsers = [];
    selectedGroupIds = [];
    announcementContent: string;
    clubUsers: any;
    clubGroups: any;
    loading = true;
    private clubId: string;

    constructor(
        private readonly modalController: ModalController,
        private readonly request: RequestService,
        private readonly toastService: ToastService,
        private readonly translateService: TranslateService,
    ) {
        this.source = 'players';
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/members`).subscribe((response) => {
            this.clubUsers = response.filter((user) => {
                return user.roles.length !== 0;
            });
            this.loading = false;
            console.log('club users', this.clubUsers);
        });

        this.request.get(`clubs/${this.clubId}/groups`).subscribe((response) => {
            console.log('club groups', response);

            this.clubGroups = response;
        });
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss();
    }

    toggleGroupSelected(group) {
        if (this.selectedGroupIds.includes(group.id)) {
            this.selectedGroupIds = this.selectedGroupIds.filter((e) => e !== group.id);
        } else {
            this.selectedGroupIds.push(group.id);
        }

        this.detectSelectedUsers();
    }

    toggleUserSelected(user) {
        if (this.selectedUsers.includes(user.id)) {
            this.selectedUsers = this.selectedUsers.filter((e) => e !== user.id);
        } else {
            this.selectedUsers.push(user.id);
        }
    }

    detectSelectedUsers() {
        const selectedUserIds = [];

        const selectedGroups = this.clubGroups.filter((group) => {
            return this.selectedGroupIds.includes(group.id);
        });

        selectedGroups.forEach((group) => {
            group.members_ids.forEach((id) => {
                if (!(selectedUserIds.includes(id))) {
                    selectedUserIds.push(id);
                }
            });
        });

        this.selectedUsers = selectedUserIds;
    }

    addAnnouncement() {
        const body = {
            announcement: {
                content: this.announcementContent,
                members_ids: this.selectedUsers,
                groups_ids: this.selectedGroupIds
            }
        };

        this.request.post(`clubs/${this.clubId}/announcements`, body).subscribe((response) => {
            if (response.data) {
                this.toastService.presentToast(this.translateService.instant('ClubPage.announcementAddSuccess'));
                this.closeModal();
            }
        });
    }
}
