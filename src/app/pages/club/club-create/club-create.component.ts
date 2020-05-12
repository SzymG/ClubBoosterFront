import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user-service/user.service';
import {RequestService} from '../../../services/request/request.service';
import {ToastService} from '../../../services/toast/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-club-create',
    templateUrl: './club-create.component.html',
    styleUrls: ['./club-create.component.scss'],
})
export class ClubCreateComponent implements OnInit {

    @ViewChild('imageInput') imageInput;

    createClub: FormGroup;
    imageUrl;
    image;

    constructor(
        private readonly modalController: ModalController,
        private readonly formBuilder: FormBuilder,
        private readonly userService: UserService,
        private readonly request: RequestService,
        private readonly toastService: ToastService,
        private readonly translateService: TranslateService,
    ) {
        this.createClub = this.formBuilder.group({
            name: ['', Validators.required],
            logo_url: [''],
        });
    }

    ngOnInit() {}

    createForm() {
        const body = {
            club: this.createClub.value,
        };

        // this.createClub.controls.photoUrl.setValue(this.imageUrl);
        this.request.post('clubs', body).subscribe((response) => {
            console.log(response);
            this.toastService.presentToast(this.translateService.instant('ClubPage.createdSuccessfully'));
            this.closeModal();
        });
    }

    closeModal() {
        this.modalController.dismiss();
    }

    triggerUpload() {
        this.imageInput.nativeElement.click();
    }

    onFileChanged($event) {
        if ($event.target.files && $event.target.files[0]) {
            const reader = new FileReader();

            this.image = $event.target.files[0];
            reader.readAsDataURL($event.target.files[0]);

            reader.onload = async () => {
                this.imageUrl = reader.result;
            };
        }
    }
}
