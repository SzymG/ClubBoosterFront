import {Component, Input, OnInit} from '@angular/core';
import {ClubStateModel} from '../../services/user-service/user.service';

@Component({
  selector: 'club-item',
  templateUrl: './club-item.component.html',
  styleUrls: ['./club-item.component.scss'],
})
export class ClubItemComponent implements OnInit {

  @Input() club: ClubStateModel;

  constructor() { }

  ngOnInit() {}

}
