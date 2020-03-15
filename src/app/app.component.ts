import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import {UserService} from './services/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public currentLanguage: string;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navigationBar: NavigationBar,
        private userService: UserService,
        private translate: TranslateService
    ) {
        this.initializeApp();
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
}
