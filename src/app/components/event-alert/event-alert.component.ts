import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-event-alert',
    templateUrl: './event-alert.component.html',
    styleUrls: ['./event-alert.component.scss'],
})
export class EventAlertComponent implements OnInit {
    private alert: HTMLIonAlertElement;

    constructor(
        private readonly alertController: AlertController,
        private readonly translateService: TranslateService,
    ) {
    }

    ngOnInit() {
    }

    async present(event) {
        this.alert = await this.alertController.create({
            header: `${event.extendedProps.description}`,
            message: `${this.formatDate(event.start)}` + (event.end ? ` - ${this.formatDate(event.end)}` : ''),
            buttons: [
                {
                    text: this.translateService.instant('Common.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: this.translateService.instant('Common.go'),
                    handler: () => {
                        // TODO przejście na pokazanie eventu
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        this.alert.present();
    }

    formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        const hours = d.getHours().toString().length ?
            '' + (d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours()) : '';
        const minutes = d.getMinutes().toString().length ?
            '' + (d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes()) : '';

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        const firstDate = [day, month, year].join('.');
        const hour = d.getHours() || d.getMinutes() ? [hours, minutes].join(':') : '';

        return [firstDate, hour].join(' ');
    }
}
