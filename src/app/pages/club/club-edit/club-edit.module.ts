import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClubEditPage } from './club-edit.page';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ClubEditPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
  declarations: [ClubEditPage]
})
export class ClubEditPageModule {}
