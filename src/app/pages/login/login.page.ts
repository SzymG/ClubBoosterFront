import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidator} from '../../components/custom-validator/custom-validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    login: FormGroup;

    constructor(
        private formBuilder: FormBuilder
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

    }
}
