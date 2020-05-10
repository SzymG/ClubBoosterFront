import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidator } from '../../components/custom-validator/custom-validator';
import {RequestService} from '../../services/request/request.service';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly request: RequestService,
        private readonly router: Router,
        private readonly toast: ToastService,
        private readonly translateService: TranslateService
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
        });
    }

    ngOnInit() {
    }

    sendForm() {
        const body = {
            user: {
                email: this.registerForm.controls.email.value,
                password: ((this.registerForm.controls.matchingPassword) as FormGroup).controls.password.value
            }
        };

        this.request.post('users', body).subscribe((response) => {
            if (response.data.id) {
                this.toast.presentToast(this.translateService.instant('RegisterPage.success'));
                this.router.navigateByUrl('/login', {skipLocationChange: true});
            }
        });
    }
}
