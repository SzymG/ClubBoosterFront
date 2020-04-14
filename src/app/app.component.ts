import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import {UserService} from './services/user-service/user.service';
import {TranslateService} from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public currentLanguage: string;
    private plFlagUrl = '/assets/img/pl-flag.png';
    private ukFlagUrl = '/assets/img/uk-flag.png';

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navigationBar: NavigationBar,
        private userService: UserService,
        private translate: TranslateService,
        private alertController: AlertController,
    ) {
        this.userService.checkToken().then(() => {
            this.initializeApp();
        });
    }

    async initializeApp() {
        this.platform.ready().then(() => {
            const autoHide = true;
            this.navigationBar.setUp(autoHide);
            this.navigationBar.hideNavigationBar();
            this.statusBar.styleDefault();
            this.statusBar.hide();
            this.splashScreen.hide();
        });

        const userLanguage = await this.userService.getLanguage();
        this.currentLanguage = userLanguage ? userLanguage : 'pl';
        this.translate.setDefaultLang(this.currentLanguage);
        this.translate.use(this.currentLanguage);
    }

    async changeLanguage() {
        const alert = await this.alertController.create({
            cssClass: 'languageSelectAlert',
            header: this.translate.instant('Language.chooseLanguage'),
            inputs: [
                {
                    name: 'radio1',
                    type: 'radio',
                    label: this.translate.instant('Language.pl'),
                    value: 'pl',
                    checked: this.currentLanguage === 'pl',
                },
                {
                    name: 'radio2',
                    type: 'radio',
                    label: this.translate.instant('Language.en'),
                    value: 'en',
                    checked: this.currentLanguage === 'en'
                },
            ],
            buttons: [
                {
                    text: this.translate.instant('Common.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => { }
                }, {
                    text: this.translate.instant('Common.confirm'),
                    handler: (language) => {
                        this.currentLanguage = language;
                        this.userService.setLanguage(language);
                        this.translate.setDefaultLang(this.translate.instant(language));
                        this.translate.use(this.translate.instant(language));
                    }
                }
            ]
        });

        await alert.present();
    }

    get imageIconUrl() {
        return this.currentLanguage === 'en' ? this.ukFlagUrl : this.plFlagUrl;
    }
}
