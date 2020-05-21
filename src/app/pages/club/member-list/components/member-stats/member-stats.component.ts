import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Chart } from 'chart.js';
import {TranslateService} from '@ngx-translate/core';

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

    constructor(
        private readonly modalController: ModalController,
        private readonly translateService: TranslateService,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
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
                        data: [12, 19, 3],
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
                                beginAtZero: true
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
                        data: [27, 4, 13],
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
                                beginAtZero: true
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
                        data: [7, 2, 1],
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
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });
    }

    closeModal() {
        this.modalController.dismiss();
    }
}
