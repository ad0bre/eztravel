import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { faArrowRight, faPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GetTransport } from '../../interfaces/get-transport';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './client-transport-offer-modal.component.html',
  styleUrl: './client-transport-offer-modal.component.scss',
  providers: [DatePipe]
})
export class ClientTransportOfferModalComponent {
  offer!: GetTransport;
  faArrowRight = faArrowRight;
  faPlane = faPlane;
  faTrash = faTrash;

  constructor(public modalRef: MdbModalRef<ClientTransportOfferModalComponent>, private datePipe: DatePipe) { }

  formatDate(date: Date): string{
    return this.datePipe.transform(date, 'dd-MM-yyyy | HH:mm:ss') || '';
  }
}
