import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputMessageComponent } from './input-message/input-message.component';
import { TranslateModule } from '@ngx-translate/core';
import {EventAlertComponent} from './event-alert/event-alert.component';
import {ClubItemComponent} from './club-item/club-item.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        InputMessageComponent,
        EventAlertComponent,
        ClubItemComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        RouterModule,
    ],
    exports: [
        InputMessageComponent,
        EventAlertComponent,
        ClubItemComponent,
    ]
})
export class ComponentsModule { }
