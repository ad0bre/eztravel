import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { TripformService } from '../../services/tripform.service';
import { ActivatedRoute } from '@angular/router';
import { GetTrip } from '../../interfaces/get-trip';
import { GetTransport } from '../../interfaces/get-transport';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { GetActivity } from '../../interfaces/get-activity';
import { TransportDetailsModalComponent } from '../transport-details-modal/transport-details-modal.component';
import { AccomodationDetailsModalComponent } from '../accomodation-details-modal/accomodation-details-modal.component';
import { ActivityDetailsModalComponent } from '../activity-details-modal/activity-details-modal.component';

@Component({
  selector: 'app-trip-info',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './trip-info.component.html',
  styleUrl: './trip-info.component.scss'
})
export class TripInfoComponent implements OnInit {
  tripId: string | null = null;
  trip?: GetTrip;
  loading: boolean = true;

  modalRefTransport: MdbModalRef<TransportDetailsModalComponent> | null = null;
  modalRefAccomodation: MdbModalRef<AccomodationDetailsModalComponent> | null = null;
  modalRefActivity: MdbModalRef<ActivityDetailsModalComponent> | null = null;

  constructor(private tripService: TripformService, private route: ActivatedRoute, private el: ElementRef, private renderer: Renderer2, private modalService: MdbModalService){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id');
      if(this.tripId){
        this.getTripDetails(this.tripId);
      }
    });
    this.addHoverEffect();
  }

  getTripDetails(tripId: string){
    this.tripService.getTripByID(tripId).subscribe(
      (trip: GetTrip) => {
        this.trip = trip;
        console.log(this.trip);
        this.loading = false;
      },
      error => {
        console.error("error fetching trip:",error);
        this.loading = false;
      }
    )
  }

  addHoverEffect(): void {
    const tripInfoElements = this.el.nativeElement.querySelectorAll('.trip_info');
    tripInfoElements.forEach((element: HTMLElement) => {
      this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = (x / rect.width - 0.5) * -50;
        const rotateX = (y / rect.height - 0.5) * 50;
        element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      this.renderer.listen(element, 'mouseleave', () => {
        element.style.transform = 'rotateX(0) rotateY(0)';
      });
    });
  }

  openTransportOffers(transport?: GetTransport[]){
    this.modalRefTransport = this.modalService.open(TransportDetailsModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefTransport.component.transports = transport;
  }

  openAccomodationOfferModal(accomodations?: GetAccomodation[]){
    this.modalRefAccomodation = this.modalService.open(AccomodationDetailsModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefAccomodation.component.accomodations = accomodations;
  }

  openActivityOfferModal(activities?: GetActivity[]){
    this.modalRefActivity = this.modalService.open(ActivityDetailsModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefActivity.component.activities = activities;
  }
}
