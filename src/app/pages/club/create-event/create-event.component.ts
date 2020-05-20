import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../services/request/request.service';
import {CustomValidator} from '../../../components/custom-validator/custom-validator';
import {TranslateService} from '@ngx-translate/core';
import {ToastService} from '../../../services/toast/toast.service';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {

    clubId: string;
    eventCreateForm: FormGroup;
    source: any;
    loading = true;
    clubUsers: any;
    clubGroups: any;
    selectedUsers = [];
    selectedGroupIds = [];

    constructor(
        private readonly modalController: ModalController,
        private readonly formBuilder: FormBuilder,
        private readonly request: RequestService,
        private readonly translateService: TranslateService,
        private readonly toastService: ToastService,
    ) {
        this.eventCreateForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            symbol: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: [''],
        });

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

    closeModal(data = null) {
        this.modalController.dismiss(data);
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

    validateDates() {
        if (this.eventCreateForm.controls.end_date.value &&
            this.eventCreateForm.controls.end_date.value < this.eventCreateForm.controls.start_date.value) {
            this.eventCreateForm.get('end_date').setErrors({dateEnd: true});
        }
    }

    get endDate() {
        return this.eventCreateForm.get('end_date');
    }

    changeSegment(event) {
        this.source = event.detail.value;
    }

    sendForm() {
        const body = {
            event: {
                ...this.eventCreateForm.value,
                members_ids: this.selectedUsers,
                groups_ids: this.selectedGroupIds
            }
        };

        this.request.post(`clubs/${this.clubId}/events`, body).subscribe((response) => {
            if (response.data) {
                this.toastService.presentToast(this.translateService.instant('ClubPage.eventAddSuccess'));
                this.closeModal({status: 'success'});
            }
        });
    }
}
