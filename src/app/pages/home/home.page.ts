import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
    ) {
        if (this.userService.isAuthenticated()) {
            this.router.navigate(['profile'], {skipLocationChange: true});
        }
    }

    ngOnInit() {
    }

}
