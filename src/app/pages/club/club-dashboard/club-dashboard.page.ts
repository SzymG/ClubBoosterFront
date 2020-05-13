import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {TranslateService} from '@ngx-translate/core';
import plLocale from '@fullcalendar/core/locales/pl';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarComponent} from '@fullcalendar/angular';

@Component({
    selector: 'app-club-dashboard',
    templateUrl: './club-dashboard.page.html',
    styleUrls: ['./club-dashboard.page.scss'],
})
export class ClubDashboardPage implements OnInit {

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;

    calendarPlugins = [dayGridPlugin];
    locales = [plLocale];
    clubEvents: [];
    loading = true;
    private clubId: string;
    private club: any;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly request: RequestService,
        private readonly translateService: TranslateService,
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.clubId = this.activatedRoute.snapshot.paramMap.get('id');

        try {
            this.request.get('clubs/' + this.clubId).subscribe((response) => {
                this.club = response;
                console.log('club', response);
            });

            this.request.get('clubs/' + this.clubId + '/events').subscribe((response) => {
                console.log('club events', response);
                this.clubEvents = response;
                this.loading = false;
            });

        } catch (e) {
            console.error(e);
            this.loading = false;
        }
    }

    eventClickHandler(event) {
        console.log(event);
    }

    get isPresident() {
        return this.club && this.club.member_roles && this.club.member_roles.includes('PRESIDENT');
    }

    get isCoachOrPresident() {
        return this.club && this.club.member_roles &&
            (this.club.member_roles.includes('PRESIDENT') || this.club.member_roles.includes('COACH'));
    }
}
