import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-create-announcement',
    templateUrl: './create-announcement.component.html',
    styleUrls: ['./create-announcement.component.scss'],
})
export class CreateAnnouncementComponent implements OnInit {

    constructor(
        private readonly modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
