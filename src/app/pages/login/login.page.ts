import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidator} from '../../components/custom-validator/custom-validator';
import {UserService} from '../../services/user-service/user.service';
import {RequestService} from '../../services/request/request.service';

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
        private request: RequestService,
    ) {
        this.login = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, CustomValidator.isValidMailFormat])],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    logForm() {
        const body = {
            user: this.login.value,
        };

        this.request.post('authentication', body).subscribe((response) => {
            console.log(response);
            if (response === 'unauthorized') {
                this.login.reset();
                this.login.get('password').setErrors({unauthorized: true});
            } else if (response.jwt.length) {
                this.userService.login(response.jwt);
            }
        });
    }

    get password() {
        return this.login.get('password');
    }
}
