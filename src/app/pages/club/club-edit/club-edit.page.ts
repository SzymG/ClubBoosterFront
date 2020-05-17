import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../services/toast/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-club-edit',
    templateUrl: './club-edit.page.html',
    styleUrls: ['./club-edit.page.scss'],
})
export class ClubEditPage implements OnInit {

    @ViewChild('imageInput') imageInput;

    public loading = true;
    public imageUrl;
    public image;
    private clubId: string;
    private editClub: FormGroup;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly request: RequestService,
        private readonly formBuilder: FormBuilder,
        private readonly toastService: ToastService,
        private readonly translateService: TranslateService,
    ) {
        this.clubId = this.activatedRoute.snapshot.paramMap.get('id');
        this.editClub = this.formBuilder.group({
            name: ['', Validators.required],
            logo_url: [''],
        });
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}`).subscribe((response) => {
            console.log('club', response);

            const {name, logo_url} = response;
            const formValue = {name, logo_url};

            this.editClub.setValue(formValue);
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    createForm() {
        if (this.editClub.valid) {
            this.request.put(`clubs/${this.clubId}`, this.editClub.value).subscribe((response) => {
                console.log(response);
                this.toastService.presentToast(this.translateService.instant('ClubPage.editSuccess'));
            });
        }
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
