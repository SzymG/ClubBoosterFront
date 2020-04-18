import {Component} from '@angular/core';
import {UserService, UserStateModel} from '../../services/user-service/user.service';

@Component({
    selector: 'app-club',
    templateUrl: './club.page.html',
    styleUrls: ['./club.page.scss'],
})
export class ClubPage {
    user: UserStateModel;

    constructor(
        private readonly userService: UserService
    ) {
    }

    async ionViewWillEnter() {
        this.user = await this.userService.getData();
        console.log(this.user);
    }

    showJoinModal() {
        //TODO - pokazać modal
    }
}
