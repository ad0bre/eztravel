import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GetTransport } from '../../interfaces/get-transport';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transport-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transport-details-modal.component.html',
  styleUrl: './transport-details-modal.component.scss',
  providers: [DatePipe]
})
export class TransportDetailsModalComponent {
  transports?: GetTransport[];

  constructor(public modalRef: MdbModalRef<TransportDetailsModalComponent>, private datePipe: DatePipe){

  }

  formatDate(date: Date): string{
    return this.datePipe.transform(date, 'dd-MM-yyyy | HH:mm:ss') || '';
  }
}
