import {Component} from '@angular/core';
import {UserService, UserStateModel} from '../../services/user-service/user.service';
import {ClubJoinComponent} from './club-join/club-join.component';
import {ModalController} from '@ionic/angular';
import {ClubCreateComponent} from './club-create/club-create.component';

@Component({
    selector: 'app-club',
    templateUrl: './club.page.html',
    styleUrls: ['./club.page.scss'],
})
export class ClubPage {
    user: UserStateModel;

    constructor(
        private readonly userService: UserService,
        private readonly modalController: ModalController
    ) {
    }

    async ionViewWillEnter() {
        this.getUserData();
    }

    async showJoinModal() {
        const modal = await this.modalController.create({
            component: ClubJoinComponent
        });
        return await modal.present();
    }

    async showCreateModal() {
        const modal = await this.modalController.create({
            component: ClubCreateComponent,
        });

        modal.onDidDismiss().then(() => {
            this.getUserData();
        });


        return await modal.present();
    }

    private async getUserData() {
        this.user = await this.userService.getData();
        console.log(this.user);
    }
}
