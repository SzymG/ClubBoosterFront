import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputMessageComponent } from './input-message/input-message.component';
import { TranslateModule } from '@ngx-translate/core';
import {EventAlertComponent} from './event-alert/event-alert.component';

@NgModule({
    declarations: [
        InputMessageComponent,
        EventAlertComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
    ],
    exports: [
        InputMessageComponent,
        EventAlertComponent
    ]
})
export class ComponentsModule { }
