import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    constructor(
        private readonly userService: UserService,
    ) {
    }

    ngOnInit() {
    }

    logout() {
        this.userService.logout();
    }
}
