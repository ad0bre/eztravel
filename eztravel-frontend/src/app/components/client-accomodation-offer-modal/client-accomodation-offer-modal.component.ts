import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faPerson, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accomodation-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './client-accomodation-offer-modal.component.html',
  styleUrl: './client-accomodation-offer-modal.component.scss',
  providers: [DatePipe]
})
export class ClientAccomodationOfferModalComponent{
  offer!: GetAccomodation;
  faArrowRight = faArrowRight;
  faPerson = faPerson;
  faTrash = faTrash;
  
  constructor(public modalRef: MdbModalRef<ClientAccomodationOfferModalComponent>, private datePipe: DatePipe) { 
  }

  formatDate(date: Date): string{
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
}
