import { Component } from '@angular/core';
import { GetActivity } from '../../interfaces/get-activity';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-activity-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './activity-offer-modal.component.html',
  styleUrl: './activity-offer-modal.component.scss'
})
export class ActivityOfferModalComponent {
  offer!: GetActivity;
  
  constructor(public modalRef: MdbModalRef<ActivityOfferModalComponent>) { 
  }

  deleteOffer(){

  }
}
