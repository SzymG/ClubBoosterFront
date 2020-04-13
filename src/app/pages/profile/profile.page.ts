import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
import plLocale from '@fullcalendar/core/locales/pl';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TranslateService} from '@ngx-translate/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventAlertComponent} from '../../components/event-alert/event-alert.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidator} from '../../components/custom-validator/custom-validator';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;
    @ViewChild('imageInput')

    imageInput;
    calendarPlugins = [dayGridPlugin];
    locales = [plLocale];
    // TODO pobieranie eventów do profilu z backendu
    profileEvents = [
        {
            description : 'Przykładowy wyjazd 1',
            title       : 'W',
            start       : '2020-04-08T14:00:00',
            end         : '2020-04-08T18:00:00',
            color       : '#57ce64',
        },
        {
            description : 'Przykładowy trening',
            title       : 'T',
            start       : '2020-04-08T18:30:00',
            color       : '#fabb3e',
        },
        {
            description: 'Przykładowy wyjazd 2',
            title : 'W',
            start : '2020-04-10',
            color       : '#57ce64',
        },
        {
            description: 'Sparing z ziemniakami',
            title : 'S',
            start : '2020-04-25T19:00:00',
            color       : '#a8319b',
        }
    ];

    profile: any;
    image: any;
    imageUrl: any;
    private profileForm: FormGroup;

    constructor(
        private readonly userService: UserService,
        private readonly translateService: TranslateService,
        private readonly eventAlert: EventAlertComponent,
        private readonly formBuilder: FormBuilder,
    ) {
        this.profileForm = this.formBuilder.group({
            id: ['', null],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            career: ['', null],
            email: [{value: null, disabled: true}, null],
            dateCreation: [{value: null, disabled: true}, null],
            birthYear: ['', null],
            description: ['', null],
        });
    }

    ngOnInit() {
        // TODO pobieranie informacji o profilu z backendu
        this.profile = {
            id: 7,
            firstName: 'Janusz',
            lastName: 'Piłkorz',
            birthYear: '1997-11-19',
            dateCreation: '2020-02-24',
            email: 'janusz.pilkorz@gmail.com',
            description: 'Jestem sobie Janusz piłkorz',
            career: 'Byłem w Barcelonie na 50%. Ja chciałem, oni nie.'
        };

        this.profileForm.setValue(this.profile);
    }

    logout() {
        this.userService.logout();
    }

    eventClickHandler($event: any) {
        this.eventAlert.present($event.event);
    }

    async sendForm() {
        console.log('send');
        // if(this.profileForm.valid) {
        //     const profile = this.profileForm;
        //     this.profileService.update(profile, this.image, this.selectedKeywords).then(
        //         response => {
        //             if(response.status === 'success') {
        //                 const profileValues = profile.getRawValue();
        //                 const newData: Partial<UserStateModel> = {
        //                     name: profileValues.firstName,
        //                     regionId: profileValues.region,
        //                 };
        //                 if(response.image_url) {
        //                     newData.photo = `${URL}${PHOTO_URL}${response.image_url}`;
        //                 }
        //                 this.store.dispatch(new SetDataAction(newData));
        //                 this.notificationService.showAlert(this.translate.instant('Profile.success'));
        //             } else {
        //                 this.notificationService.showAlert(this.translate.instant('Profile.error', 'danger'));
        //             }
        //         },
        //         _ => {
        //             this.notificationService.showAlert(this.translate.instant('Profile.error', 'danger'));
        //         }
        //     );
        // }
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
