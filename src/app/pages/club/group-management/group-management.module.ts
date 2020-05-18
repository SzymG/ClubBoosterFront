import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {GroupManagementPage} from './group-management.page';
import {TranslateModule} from '@ngx-translate/core';
import {AddGroupComponent} from './components/add-group/add-group.component';

const routes: Routes = [
    {
        path: '',
        component: GroupManagementPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule
    ],
    declarations: [GroupManagementPage, AddGroupComponent],
    entryComponents: [AddGroupComponent]
})
export class GroupManagementPageModule {
}
