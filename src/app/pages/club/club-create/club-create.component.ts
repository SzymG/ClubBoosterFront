import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    ) {
        this.createClub = this.formBuilder.group({
            name: ['', Validators.required],
            photoUrl: [''],
            description: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    createForm() {
        // TODO request z dodaniem klubu
        this.createClub.controls.photoUrl.setValue(this.imageUrl);
        this.closeModal();
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
