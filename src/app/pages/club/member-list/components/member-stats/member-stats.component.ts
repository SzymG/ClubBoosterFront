import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Chart } from 'chart.js';
import {TranslateService} from '@ngx-translate/core';
import {RequestService} from '../../../../../services/request/request.service';

@Component({
    selector: 'app-member-stats',
    templateUrl: './member-stats.component.html',
    styleUrls: ['./member-stats.component.scss'],
})
export class MemberStatsComponent implements OnInit {

    @ViewChild('barCanvasMatch') barCanvasMatch: ElementRef;
    @ViewChild('barCanvasTraining') barCanvasTraining: ElementRef;
    @ViewChild('barCanvasOther') barCanvasOther: ElementRef;

    private barChartMatch: Chart;
    private barChartTraining: Chart;
    private barChartOther: Chart;
    private clubId;
    private memberId;

    constructor(
        private readonly modalController: ModalController,
        private readonly translateService: TranslateService,
        private readonly request: RequestService,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.request.get(`clubs/${this.clubId}/members/${this.memberId}/statistics`).subscribe((stats) => {

            this.barChartMatch = new Chart(this.barCanvasMatch.nativeElement, {
                type: 'bar',
                data: {
                    labels: [
                        this.translateService.instant('ClubPage.eventPresent'),
                        this.translateService.instant('ClubPage.eventNoVote'),
                        this.translateService.instant('ClubPage.eventAbsent'),
                    ],
                    datasets: [
                        {
                            data: [stats.M.present, stats.M.no_vote, stats.M.absent],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255,99,132,1)',
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                            }
                        ]
                    }
                }
            });

            this.barChartTraining = new Chart(this.barCanvasTraining.nativeElement, {
                type: 'bar',
                data: {
                    labels: [
                        this.translateService.instant('ClubPage.eventPresent'),
                        this.translateService.instant('ClubPage.eventNoVote'),
                        this.translateService.instant('ClubPage.eventAbsent'),
                    ],
                    datasets: [
                        {
                            data: [stats.T.present, stats.T.no_vote, stats.T.absent],
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255,99,132,1)',
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                            }
                        ]
                    }
                }
            });

            this.barChartOther = new Chart(this.barCanvasOther.nativeElement, {
                type: 'bar',
                data: {
                    labels: [
                        this.translateService.instant('ClubPage.eventPresent'),
                        this.translateService.instant('ClubPage.eventNoVote'),
                        this.translateService.instant('ClubPage.eventAbsent'),
                    ],
                    datasets: [
                        {
                            data: [stats.I.present, stats.I.no_vote, stats.I.absent],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255,99,132,1)',
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1
                                }
                            }
                        ]
                    }
                }
            });
        });
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
