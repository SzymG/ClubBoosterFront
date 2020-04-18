import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidator} from '../../components/custom-validator/custom-validator';
import {UserService} from '../../services/user-service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    login: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
    ) {
        this.login = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, CustomValidator.isValidMailFormat])],
            password: ['', Validators.required],
            validationError: false,
        });
    }

    ngOnInit() {
    }

    logForm() {
        //TODO dodać logowanie na backendzie
        const response = {
            userId: 7,
            clubs: [
                {
                    clubId: 1,
                    name: 'Polskie Zimnioki',
                    photoUrl: '/assets/img/club.png'
                },
                {
                    clubId: 2,
                    name: 'Huragan Kaźmirz',
                    photoUrl: '/assets/img/club.png'
                }
            ],
            photoUrl: '/assets/img/user.png'
        };
        this.userService.setData(response);
        this.userService.login(true);
    }
}
