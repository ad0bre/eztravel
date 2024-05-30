import { Component } from '@angular/core';
import { GetActivity } from '../../interfaces/get-activity';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-details-modal.component.html',
  styleUrl: './activity-details-modal.component.scss'
})
export class ActivityDetailsModalComponent {
  activities?: GetActivity[];

  constructor(public modalRef: MdbModalRef<ActivityDetailsModalComponent>){

  }
}
