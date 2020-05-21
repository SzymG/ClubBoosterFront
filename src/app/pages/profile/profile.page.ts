import {Component, ViewChild} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
import plLocale from '@fullcalendar/core/locales/pl';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TranslateService} from '@ngx-translate/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventAlertComponent} from '../../components/event-alert/event-alert.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../services/toast/toast.service';
import {RequestService} from '../../services/request/request.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;
    @ViewChild('imageInput') imageInput;

    calendarPlugins = [dayGridPlugin];
    locales = [plLocale];
    profileEvents = [];
    profile: any;
    image: any;
    imageUrl: any;
    saving: boolean;
    profileForm: FormGroup;

    constructor(
        private readonly userService: UserService,
        private readonly eventAlert: EventAlertComponent,
        private readonly formBuilder: FormBuilder,
        private readonly toastService: ToastService,
        private readonly request: RequestService,
        private readonly http: HttpClient,
        public translateService: TranslateService,
    ) {
        this.profileForm = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            career_description: ['', null],
            email: [{value: null, disabled: true}, null],
            birth_date: ['', null],
            personal_description: ['', null],
            avatar_url: [''],
        });
    }

    ionViewWillEnter() {
        this.request.get('events').subscribe((response) => {
            console.log('user events', response);
            this.profileEvents = response;
        });

        this.request.get('users/current').subscribe((response) => {
            console.log('user profile', response);
            this.profile = response;
            this.profileForm.setValue(this.profile);
        });
    }

    logout() {
        this.userService.logout();
    }

    eventClickHandler($event: any) {
        this.eventAlert.present($event.event);
    }

    async sendForm() {
        this.saving = true;
        const imageStr = this.imageUrl.split(';base64,')[1];
        const blobData = await this.b64toBlob(imageStr);
        const fileName = `${new Date().getMinutes()}${this.image.name}`;
        const testToken = 'QCuJSvgzyCAAAAAAAAAADOhIR5FIPcZHoKZpTHau2rjRTFD38uw2XXTR29ltnDYy';
        const headers = new HttpHeaders().append('Authorization', 'Bearer ' + testToken)
            .append('Content-Type', 'application/octet-stream')
            .append('Dropbox-API-Arg', '{"path":"/dropbox/' + fileName + '"}');

        this.http.post('https://content.dropboxapi.com/2/files/upload', blobData, { headers }).subscribe(res => {
            this.profileForm.controls.avatar_url.setValue(fileName);
            console.log('profile to update', this.profileForm.value);
            if (this.profileForm.valid) {
                this.request.put('users', this.profileForm.value).subscribe((response) => {
                    console.log(response);
                    this.toastService.presentToast(this.translateService.instant('Profile.success'));
                });
            }
            this.saving = false;
        }, err => {
            console.error(err);
            this.saving = false;
            this.toastService.presentToast(this.translateService.instant('Profile.failure'));
        });
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
            console.log(this.image);
            reader.readAsDataURL($event.target.files[0]);

            reader.onload = async () => {
                this.imageUrl = reader.result;
            };
        }
    }
}
