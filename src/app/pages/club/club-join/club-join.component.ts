import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {ToastService} from '../../../services/toast/toast.service';

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
    ) {
        this.joinClub = this.formBuilder.group({
            token: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    joinForm() {
        // TODO request z prośbą o dołączenie do klubu
        console.log(this.joinClub.value);
        this.closeModal();
        this.toastService.presentToast('Pomyślnie wysłano prośbę o dołączenie');
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
