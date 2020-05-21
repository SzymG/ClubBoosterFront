import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClubDashboardPage} from './club-dashboard.page';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TranslateModule} from '@ngx-translate/core';
import {CreateAnnouncementComponent} from '../create-announcement/create-announcement.component';
import {CreateEventComponent} from '../create-event/create-event.component';
import {ClubAsksComponent} from '../club-asks/club-asks.component';
import {UserToAcceptComponent} from '../club-asks/components/user-to-accept/user-to-accept.component';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {UserProfileComponent} from '../club-asks/components/user-profile/user-profile.component';
import {ComponentsModule} from '../../../components/components.module';
import {EventAlertComponent} from '../../../components/event-alert/event-alert.component';
import {MemberStatsComponent} from './components/member-stats/member-stats.component';

const routes: Routes = [
    {
        path: '',
        component: ClubDashboardPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot(),
        RouterModule.forChild(routes),
        FullCalendarModule,
        TranslateModule,
        ReactiveFormsModule,
        ComponentsModule,
    ],
    providers: [
        Clipboard,
        EventAlertComponent
    ],
    declarations: [
        ClubDashboardPage,
        CreateAnnouncementComponent,
        CreateEventComponent,
        ClubAsksComponent,
        UserToAcceptComponent,
        UserProfileComponent,
    ],
    entryComponents: [
        CreateAnnouncementComponent,
        CreateEventComponent,
        ClubAsksComponent,
        UserProfileComponent,
    ],
})
export class ClubDashboardPageModule {
}
