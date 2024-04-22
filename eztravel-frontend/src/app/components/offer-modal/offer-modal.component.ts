import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { faArrowRight, faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Transport } from '../../interfaces/transport';

@Component({
  selector: 'app-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './offer-modal.component.html',
  styleUrl: './offer-modal.component.scss'
})
export class OfferModalComponent {
  offer!: Transport;
  faArrowRight = faArrowRight;
  faPlane = faPlane;

  constructor(public modalRef: MdbModalRef<OfferModalComponent>) { }

  deleteOffer(){

  }
}
