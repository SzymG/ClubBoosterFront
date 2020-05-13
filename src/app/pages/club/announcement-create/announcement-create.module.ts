import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnnouncementCreatePage } from './announcement-create.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnnouncementCreatePage]
})
export class AnnouncementCreatePageModule {}