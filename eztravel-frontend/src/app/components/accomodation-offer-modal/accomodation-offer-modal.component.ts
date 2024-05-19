import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faPerson, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccomodationService } from '../../services/accomodation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accomodation-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './accomodation-offer-modal.component.html',
  styleUrl: './accomodation-offer-modal.component.scss',
  providers: [DatePipe]
})
export class AccomodationOfferModalComponent {
  offer!: GetAccomodation;
  faArrowRight = faArrowRight;
  faPerson = faPerson;
  faTrash = faTrash;
  
  constructor(public modalRef: MdbModalRef<AccomodationOfferModalComponent>, private accomodationService: AccomodationService, private datePipe: DatePipe) { 
  }

  deleteOffer(){
    this.accomodationService.deleteAccomodation(this.offer.id).subscribe(
      () => {
        console.log("Accomodation deleted successfully!");
        this.modalRef.close();
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDate(date: Date): string{
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
}
