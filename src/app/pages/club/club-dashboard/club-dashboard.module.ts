import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
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
import {ClubProfileComponent} from '../club-profile/club-profile.component';
import {UserProfileComponent} from '../club-asks/components/user-profile/user-profile.component';

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
        IonicModule,
        RouterModule.forChild(routes),
        FullCalendarModule,
        TranslateModule,
    ],
    providers: [
        Clipboard
    ],
    declarations: [
        ClubDashboardPage,
        CreateAnnouncementComponent,
        CreateEventComponent,
        ClubAsksComponent,
        UserToAcceptComponent,
        UserProfileComponent
    ],
    entryComponents: [
        CreateAnnouncementComponent,
        CreateEventComponent,
        ClubAsksComponent,
        UserProfileComponent
    ],
})
export class ClubDashboardPageModule {
}
