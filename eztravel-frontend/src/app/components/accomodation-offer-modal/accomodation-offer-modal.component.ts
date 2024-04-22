import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faPerson } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accomodation-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './accomodation-offer-modal.component.html',
  styleUrl: './accomodation-offer-modal.component.scss'
})
export class AccomodationOfferModalComponent {
  offer!: GetAccomodation;
  faArrowRight = faArrowRight;
  faPerson = faPerson;
  
  constructor(public modalRef: MdbModalRef<AccomodationOfferModalComponent>) { 
  }

  deleteOffer(){

  }
}
