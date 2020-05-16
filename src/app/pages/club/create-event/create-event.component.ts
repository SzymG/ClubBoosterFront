import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {

  constructor(
      private readonly modalController: ModalController,
  ) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
