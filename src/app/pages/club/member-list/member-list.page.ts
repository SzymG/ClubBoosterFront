import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../../../services/request/request.service';
import {CreateAnnouncementComponent} from '../create-announcement/create-announcement.component';
import {ModalController} from '@ionic/angular';
import {ClubProfileComponent} from '../club-profile/club-profile.component';

@Component({
    selector: 'app-member-list',
    templateUrl: './member-list.page.html',
    styleUrls: ['./member-list.page.scss'],
})
export class MemberListPage implements OnInit {
    public loading = true;
    public clubUsers: [];
    private clubId: string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly request: RequestService,
        private readonly modalController: ModalController,
    ) {
        this.clubId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/members`).subscribe((response) => {
            this.clubUsers = response.filter((user) => {
                return user.roles.length !== 0;
            });

            console.log('club users', this.clubUsers);
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    getIconName(user) {
        if (user.roles.includes('PRESIDENT')) {
            return 'person-add';
        } else if (user.roles.includes('COACH')) {
            return 'person';
        } else {
            return 'football';
        }
    }

    async goToProfile(user) {
        const modal = await this.modalController.create({
            component: ClubProfileComponent,
            componentProps: {
                clubId: user.club_id,
                memberId: user.id,
            }
        });

        modal.onDidDismiss().then((data: any) => {
            if (data.data && data.data.status) {
                this.ionViewWillEnter();
            }
        });

        return await modal.present();
    }
}
