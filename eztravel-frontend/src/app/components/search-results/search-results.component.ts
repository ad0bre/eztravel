import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { TripformService } from '../../services/tripform.service';
import { GetTrip } from '../../interfaces/get-trip';
import { GetTransport } from '../../interfaces/get-transport';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { GetActivity } from '../../interfaces/get-activity';
import { faPlane, faHotel, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';
import { AccomodationOfferModalComponent } from '../accomodation-offer-modal/accomodation-offer-modal.component';
import { ActivityOfferModalComponent } from '../activity-offer-modal/activity-offer-modal.component';
import { ClientAccomodationOfferModalComponent } from '../client-accomodation-offer-modal/client-accomodation-offer-modal.component';
import { ClientActivityOfferModalComponent } from '../client-activity-offer-modal/client-activity-offer-modal.component';
import { ClientTransportOfferModalComponent } from '../client-transport-offer-modal/client-transport-offer-modal.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FontAwesomeModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  userId: string | null;
  tripId: string | null;
  offers!: GetTrip;
  transports: GetTransport[] = [];
  accomodations: GetAccomodation[] = [];
  activities: GetActivity[] = [];
  loading: boolean = true;

  faPlane = faPlane;
  faHotel = faHotel;
  faCamera = faCameraRetro;

  modalRefOffer: MdbModalRef<ClientTransportOfferModalComponent> | null = null;
  modalRefAccomodationOffer: MdbModalRef<ClientAccomodationOfferModalComponent> | null = null;
  modalRefActivityOffer: MdbModalRef<ClientActivityOfferModalComponent> | null = null;

  constructor(private tripService: TripformService, private modalService: MdbModalService) {
    this.userId = localStorage.getItem('userID');
    this.tripId = localStorage.getItem('tripID');
  }

  ngOnInit(): void {
    this.listOffersByTripId();
  }
  /*
  listOffers() {
    if (this.userId) {
      this.tripService.getTripsByUser(this.userId).subscribe(
        (offers: GetTrip[]) => {
          this.offers = offers;
          console.log("Offers:", this.offers);
          this.transports = this.offers.flatMap(offer => offer.transports);
          this.accomodations = this.offers.flatMap(offer => offer.accomodations);
          this.activities = this.offers.flatMap(offer => offer.activities);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching offers:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('No user ID found');
    }
  }
  */

  listOffersByTripId() {
    if (this.tripId) {
      this.tripService.getTripByID(this.tripId).subscribe(
        (trip: GetTrip) => {
          this.offers = trip;
          console.log("Offers by Trip ID:", this.offers);
          this.transports = trip.transports;
          this.accomodations = trip.accomodations;
          this.activities = trip.activities;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching offers by Trip ID:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('No Trip ID found');
    }
  }

  openTransportOfferModal(offer: GetTransport){
    this.modalRefOffer = this.modalService.open(ClientTransportOfferModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefOffer.component.offer = offer;
  }

  openAccomodationOfferModal(offer: GetAccomodation){
    this.modalRefAccomodationOffer = this.modalService.open(ClientAccomodationOfferModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefAccomodationOffer.component.offer = offer;
  }

  openActivityOfferModal(offer: GetActivity){
    this.modalRefActivityOffer = this.modalService.open(ClientActivityOfferModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefActivityOffer.component.offer = offer;
  }
}