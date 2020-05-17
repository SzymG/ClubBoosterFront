import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RequestService} from '../../../../../services/request/request.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    public memberId: string;
    public clubId: string;
    public loading = true;
    public userProfile: any;

    constructor(
        private readonly modalController: ModalController,
        private readonly request: RequestService,
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

    closeModal() {
        this.modalController.dismiss();
    }

}
