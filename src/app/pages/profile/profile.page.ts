import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
import plLocale from '@fullcalendar/core/locales/pl';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TranslateService} from '@ngx-translate/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventAlertComponent} from '../../components/event-alert/event-alert.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../services/toast/toast.service';
import {RequestService} from '../../services/request/request.service';

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
    private profileForm: FormGroup;

    constructor(
        private readonly userService: UserService,
        private readonly translateService: TranslateService,
        private readonly eventAlert: EventAlertComponent,
        private readonly formBuilder: FormBuilder,
        private readonly toastService: ToastService,
        private readonly request: RequestService,
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
        // this.profileForm.controls.avatar_url.setValue(this.imageUrl);
        console.log('profile to update', this.profileForm.value);
        if (this.profileForm.valid) {
            this.request.put('users', this.profileForm.value).subscribe((response) => {
                console.log(response);
                this.toastService.presentToast(this.translateService.instant('Profile.success'));
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
