import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MemberListPage} from './member-list.page';
import {TranslateModule} from '@ngx-translate/core';
import {ClubProfileComponent} from '../club-profile/club-profile.component';
import {MemberStatsComponent} from './components/member-stats/member-stats.component';

const routes: Routes = [
    {
        path: '',
        component: MemberListPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
    ],
    declarations: [MemberListPage, ClubProfileComponent, MemberStatsComponent],
    entryComponents: [ClubProfileComponent, MemberStatsComponent]
})
export class MemberListPageModule {
}
