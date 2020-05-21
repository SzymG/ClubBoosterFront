import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputMessageComponent } from './input-message/input-message.component';
import { TranslateModule } from '@ngx-translate/core';
import {EventAlertComponent} from './event-alert/event-alert.component';
import {ClubItemComponent} from './club-item/club-item.component';
import {RouterModule} from '@angular/router';
import {ClubEventComponent} from './club-event/club-event.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        InputMessageComponent,
        EventAlertComponent,
        ClubItemComponent,
        ClubEventComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        RouterModule,
        FormsModule,
    ],
    entryComponents: [
        ClubEventComponent
    ],
    exports: [
        InputMessageComponent,
        EventAlertComponent,
        ClubItemComponent,
    ]
})
export class ComponentsModule { }
