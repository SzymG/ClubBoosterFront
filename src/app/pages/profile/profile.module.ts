import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ProfilePage} from './profile.page';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TranslateModule} from '@ngx-translate/core';
import {EventAlertComponent} from '../../components/event-alert/event-alert.component';

const routes: Routes = [
    {
        path: '',
        component: ProfilePage
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
    declarations: [
        ProfilePage
    ],
    providers: [
        EventAlertComponent
    ]
})
export class ProfilePageModule {
}
