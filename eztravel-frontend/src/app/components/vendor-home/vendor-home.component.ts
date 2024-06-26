import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalAccomodationComponent } from '../modal-accomodation/modal-accomodation.component';
import { ModalComponent } from '../modal/modal.component';
import { ModalActivityComponent } from '../modal-activity/modal-activity.component';
import { TransportService } from '../../services/transport.service';
import { UserProfileService } from '../../services/user-profile.service';
import { CommonModule } from '@angular/common';
import { AccomodationService } from '../../services/accomodation.service';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlaneDeparture, faHotel, faCameraRetro, faPlus } from '@fortawesome/free-solid-svg-icons';
import { GetActivity } from '../../interfaces/get-activity';
import { ActivityService } from '../../services/activity.service';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';
import { ActivityOfferModalComponent } from '../activity-offer-modal/activity-offer-modal.component';
import { AccomodationOfferModalComponent } from '../accomodation-offer-modal/accomodation-offer-modal.component';
import { GetTransport } from '../../interfaces/get-transport';

@Component({
  selector: 'app-vendor-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FontAwesomeModule],
  templateUrl: './vendor-home.component.html',
  styleUrl: './vendor-home.component.scss'
})
export class VendorHomeComponent implements OnInit{
  faPlaneDeparture = faPlaneDeparture;
  faHotel = faHotel;
  faCameraRetro = faCameraRetro;
  faPlus = faPlus;

  username: string | null;
  id: string | null;
  profileId: string | null;

  transports: GetTransport[] = [];
  accomodations: GetAccomodation[] = [];
  activities: GetActivity[] = [];

  loadingTransports: boolean = true;
  loadingAccomodations: boolean = true;
  loadingActivities: boolean = true;

  modalRefTransport: MdbModalRef<ModalComponent> | null = null;
  modalRefAccomodation: MdbModalRef<ModalAccomodationComponent> | null = null;
  modalRefActivity: MdbModalRef<ModalActivityComponent> | null = null;
  modalRefOffer: MdbModalRef<OfferModalComponent> | null = null;
  modalRefAccomodationOffer: MdbModalRef<AccomodationOfferModalComponent> | null = null;
  modalRefActivityOffer: MdbModalRef<ActivityOfferModalComponent> | null = null;

  constructor(private modalService: MdbModalService, private transportService: TransportService, private accomodationService: AccomodationService, private activityService: ActivityService, private userProfileService: UserProfileService) {
    this.username = null;
    this.profileId = null;
    this.id = null;
  }

  ngOnInit(): void {
      this.username = localStorage.getItem('username');
      this.id = localStorage.getItem('userID');
      this.profileId = localStorage.getItem('profileID');
      this.listTransports();
      this.listAccomodations();
      this.listActivities();
  }

  listTransports(){
    this.transportService.getTransports().subscribe(
      (transports: GetTransport[]) => {
        this.transports = transports.filter(transport => transport.profileId === this.profileId);
        this.loadingTransports = false;
      },
      (error) =>{
        console.log(error);
        this.loadingTransports = false;
      }
    )
  }
  
  listAccomodations(){
    this.accomodationService.getAccomodations().subscribe(
      (accomodations: GetAccomodation[]) => {
        this.accomodations = accomodations.filter(accomodation => accomodation.profileId === this.profileId);
        this.loadingAccomodations = false;
      },
      (error) => {
        console.log(error);
        this.loadingAccomodations = false;
      }
    )
  }

  listActivities(){
    this.activityService.getActivities().subscribe(
      (activities: GetActivity[]) => {
        this.activities = activities.filter(activity => activity.profileId === this.profileId);
        console.log(this.activities);
        this.loadingActivities = false;
      },
      (error) => {
        console.log(error);
        this.loadingActivities = false;
      }
    )
  }

  openTransportModal(){
    this.modalRefTransport = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    })
  }

  openAccomodationModal(){
    this.modalRefAccomodation = this.modalService.open(ModalAccomodationComponent, {
      modalClass: 'modal-dialog-scrollable'
    })
  }

  openActivityModal(){
    this.modalRefActivity = this.modalService.open(ModalActivityComponent, {
      modalClass: 'modal-dialog-scrollable'
    })
  }

  openTransportOfferModal(offer: GetTransport){
    this.modalRefOffer = this.modalService.open(OfferModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefOffer.component.offer = offer;
  }

  openAccomodationOfferModal(offer: GetAccomodation){
    this.modalRefAccomodationOffer = this.modalService.open(AccomodationOfferModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefAccomodationOffer.component.offer = offer;
  }

  openActivityOfferModal(offer: GetActivity){
    this.modalRefActivityOffer = this.modalService.open(ActivityOfferModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    });
    this.modalRefActivityOffer.component.offer = offer;
  }
}
