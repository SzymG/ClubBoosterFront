import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClubPage} from './club.page';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../components/components.module';
import {ClubJoinComponent} from './club-join/club-join.component';

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
        ComponentsModule
    ],
    declarations: [ClubPage, ClubJoinComponent],
    entryComponents: [
        ClubJoinComponent
    ],
})
export class ClubPageModule {
}
