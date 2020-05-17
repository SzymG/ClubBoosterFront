import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClubPage} from './club.page';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../components/components.module';
import {ClubJoinComponent} from './club-join/club-join.component';
import {ClubCreateComponent} from './club-create/club-create.component';
import {ClubProfileComponent} from './club-profile/club-profile.component';
import {MemberListPageModule} from './member-list/member-list.module';
import {UserProfileComponent} from './club-asks/components/user-profile/user-profile.component';

const routes: Routes = [
    {
        path: '',
        component: ClubPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ComponentsModule,
        ReactiveFormsModule,
    ],
    declarations: [ClubPage, ClubJoinComponent, ClubCreateComponent],
    entryComponents: [
        ClubJoinComponent,
        ClubCreateComponent
    ],
})
export class ClubPageModule {
}
