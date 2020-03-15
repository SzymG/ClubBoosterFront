import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidator } from '../../components/custom-validator/custom-validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
    ) {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                CustomValidator.isValidMailFormat
            ])],
            matchingPassword: this.formBuilder.group({
                password: ['', Validators.compose([
                    Validators.required,
                    CustomValidator.password
                ])],
                confirmPassword: ['', Validators.required]
            }, { validator: CustomValidator.areEqual }),
            terms: [false, CustomValidator.isTrue],
            personalData: [false, CustomValidator.isTrue]
        });
    }

    ngOnInit() {
    }

    sendForm() {

    }
}
