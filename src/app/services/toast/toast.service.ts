import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
      private readonly toastController: ToastController,
  ) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      cssClass: 'toast-component',
      duration: 2000
    });
    toast.present();
  }
}
