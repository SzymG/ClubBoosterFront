import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
import plLocale from '@fullcalendar/core/locales/pl';
import dayGridPlugin from '@fullcalendar/daygrid';
import {TranslateService} from '@ngx-translate/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventAlertComponent} from '../../components/event-alert/event-alert.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;

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

    constructor(
        private readonly userService: UserService,
        private readonly translateService: TranslateService,
        private readonly eventAlert: EventAlertComponent,
    ) {
    }

    ngOnInit() {
        // const api = this.calendarComponent.getApi();
        // api.setOption('locale', '1');
    }

    logout() {
        this.userService.logout();
    }

    eventClickHandler($event: any) {
        console.log($event);
        this.eventAlert.present($event.event);
    }
}
