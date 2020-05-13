import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {ToastService} from '../../../services/toast/toast.service';
import {RequestService} from '../../../services/request/request.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-club-join',
    templateUrl: './club-join.component.html',
    styleUrls: ['./club-join.component.scss'],
})
export class ClubJoinComponent implements OnInit {
    joinClub: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private modalController: ModalController,
        private toastService: ToastService,
        private request: RequestService,
        private translateService: TranslateService,
    ) {
        this.joinClub = this.formBuilder.group({
            club_token: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    joinForm() {
        this.request.post('clubs/join', this.joinClub.value).subscribe((response) => {
            console.log(response);
            if (response === 'unauthorized') {
                this.toastService.presentToast(this.translateService.instant('ClubPage.badToken'));
            } else if (response.data.id) {
                this.toastService.presentToast(this.translateService.instant('ClubPage.joinedSuccessfully'));
                this.closeModal();
            }
        });
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
