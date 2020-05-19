import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClubAnnouncementsPage } from './club-announcements.page';

const routes: Routes = [
  {
    path: '',
    component: ClubAnnouncementsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClubAnnouncementsPage]
})
export class ClubAnnouncementsPageModule {}
