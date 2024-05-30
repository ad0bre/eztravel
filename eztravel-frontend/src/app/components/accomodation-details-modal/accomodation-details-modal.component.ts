import { Component } from '@angular/core';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-accomodation-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accomodation-details-modal.component.html',
  styleUrl: './accomodation-details-modal.component.scss',
  providers: [DatePipe]
})
export class AccomodationDetailsModalComponent {
  accomodations?: GetAccomodation[];

  constructor(public modalRef: MdbModalRef<AccomodationDetailsModalComponent>, private datePipe: DatePipe){

  }

  formatDate(date: Date): string{
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
}
