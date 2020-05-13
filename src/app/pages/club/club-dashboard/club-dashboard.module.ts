import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClubDashboardPage } from './club-dashboard.page';
import {FullCalendarModule} from '@fullcalendar/angular';
import {TranslateModule} from '@ngx-translate/core';

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
        TranslateModule
    ],
  declarations: [ClubDashboardPage]
})
export class ClubDashboardPageModule {}
