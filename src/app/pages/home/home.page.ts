import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {

    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly platform: Platform
    ) {
    }

    ionViewWillEnter() {
        this.platform.ready().then(() => {
            if(this.userService.isAuthenticated()) {
                this.router.navigate(['profile'], {skipLocationChange: true});
            }
        });
    }

}
