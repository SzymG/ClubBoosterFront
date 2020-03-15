import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputMessageComponent } from './input-message/input-message.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        InputMessageComponent,
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
    ],
    exports: [
        InputMessageComponent,
    ]
})
export class ComponentsModule { }
