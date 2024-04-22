import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { faArrowRight, faPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GetTransport } from '../../interfaces/get-transport';
import { TransportService } from '../../services/transport.service';

@Component({
  selector: 'app-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './offer-modal.component.html',
  styleUrl: './offer-modal.component.scss'
})
export class OfferModalComponent {
  offer!: GetTransport;
  faArrowRight = faArrowRight;
  faPlane = faPlane;
  faTrash = faTrash;

  constructor(public modalRef: MdbModalRef<OfferModalComponent>, private transportService: TransportService) { }

  deleteOffer(){
     this.transportService.deleteTransport(this.offer.id).subscribe(
      () => {
        console.log("Transport deleted successfully!");
        this.modalRef.close();
      },
      (error) => {
        console.log(error);
      }
     );
  }
}
