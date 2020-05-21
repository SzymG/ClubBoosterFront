import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../services/toast/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
    public saving: boolean;
    private clubId: string;
    private editClub: FormGroup;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly request: RequestService,
        private readonly formBuilder: FormBuilder,
        private readonly toastService: ToastService,
        private readonly translateService: TranslateService,
        private readonly http: HttpClient,
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

    async createForm() {
        if (this.editClub.valid) {
            this.saving = true;
            const imageStr = this.imageUrl.split(';base64,')[1];
            const blobData = await this.b64toBlob(imageStr);
            const fileName = `${new Date().getMinutes()}${this.image.name}`;
            const testToken = 'QCuJSvgzyCAAAAAAAAAADOhIR5FIPcZHoKZpTHau2rjRTFD38uw2XXTR29ltnDYy';
            const headers = new HttpHeaders().append('Authorization', 'Bearer ' + testToken)
                .append('Content-Type', 'application/octet-stream')
                .append('Dropbox-API-Arg', '{"path":"/dropbox/' + fileName + '"}');

            this.http.post('https://content.dropboxapi.com/2/files/upload', blobData, {headers}).subscribe(res => {
                this.editClub.controls.logo_url.setValue(fileName);

                this.request.put(`clubs/${this.clubId}`, this.editClub.value).subscribe((response) => {
                    console.log(response);
                    this.toastService.presentToast(this.translateService.instant('ClubPage.editSuccess'));
                    this.saving = false;
                });
            }, err => {
                console.error(err);
                this.saving = false;
                this.toastService.presentToast(this.translateService.instant('ClubPage.editFailure'));
            });
        }
    }

    b64toBlob = ( b64Data, contentType = '', sliceSize = 512 ) => {
        return new Promise((resovle) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            resovle(new Blob(byteArrays, {type: contentType}));
        });
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
