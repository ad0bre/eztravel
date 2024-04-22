import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalAccomodationComponent } from '../modal-accomodation/modal-accomodation.component';
import { ModalComponent } from '../modal/modal.component';
import { ModalActivityComponent } from '../modal-activity/modal-activity.component';
import { TransportService } from '../../services/transport.service';
import { Transport } from '../../interfaces/transport';
import { UserProfileService } from '../../services/user-profile.service';
import { GetUserProfile } from '../../interfaces/get-user-profile';
import { CommonModule } from '@angular/common';
import { AccomodationService } from '../../services/accomodation.service';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlaneDeparture, faHotel, faCameraRetro, faC } from '@fortawesome/free-solid-svg-icons';
import { GetActivity } from '../../interfaces/get-activity';
import { ActivityService } from '../../services/activity.service';
import { OfferModalComponent } from '../offer-modal/offer-modal.component';
import { ActivityOfferModalComponent } from '../activity-offer-modal/activity-offer-modal.component';
import { AccomodationOfferModalComponent } from '../accomodation-offer-modal/accomodation-offer-modal.component';
import { TransferState } from '@angular/platform-browser';

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

  username: string | null;
  id: string | null;
  profileId: string = '';

  transports: Transport[] = [];
  accomodations: GetAccomodation[] = [];
  activities: GetActivity[] = [];

  modalRefTransport: MdbModalRef<ModalComponent> | null = null;
  modalRefAccomodation: MdbModalRef<ModalAccomodationComponent> | null = null;
  modalRefActivity: MdbModalRef<ModalActivityComponent> | null = null;
  modalRefOffer: MdbModalRef<OfferModalComponent> | null = null;
  modalRefAccomodationOffer: MdbModalRef<AccomodationOfferModalComponent> | null = null;
  modalRefActivityOffer: MdbModalRef<ActivityOfferModalComponent> | null = null;

  constructor(private modalService: MdbModalService, private transportService: TransportService, private accomodationService: AccomodationService, private activityService: ActivityService, private userProfileService: UserProfileService) {
    this.username = null;
    this.id = null;
  }

  ngOnInit(): void {
      this.username = localStorage.getItem('username');
      this.id = localStorage.getItem('userID');
      this.findUserProfile(this.id);
  }

  listTransports(){
    this.transportService.getTransports().subscribe(
      (transports: Transport[]) => {
        this.transports = transports.filter(transport => transport.profileId === this.profileId);
      },
      (error) =>{
        console.log(error);
      }
    )
  }
  
  listAccomodations(){
    this.accomodationService.getAccomodations().subscribe(
      (accomodations: GetAccomodation[]) => {
        this.accomodations = accomodations.filter(accomodation => accomodation.profileId === this.profileId);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  listActivities(){
    this.activityService.getActivities().subscribe(
      (activities: GetActivity[]) => {
        this.activities = activities.filter(activity => activity.profileId === this.profileId);
        console.log(this.activities);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  findUserProfile(id: string | null): void {
    this.userProfileService.getUserProfiles().subscribe(
      (userProfiles: GetUserProfile[]) => {
        const foundUserProfile = userProfiles.find(userProfile => userProfile.userId === id);
        if (foundUserProfile) {
          console.log('User Profile:', foundUserProfile);
          this.profileId = foundUserProfile.id;
          this.listTransports();
          this.listAccomodations();
          this.listActivities();
        } else {
          console.log('User profile not found!');
        }
      },
      (error) => {
        console.error('Error fetching user profiles:', error);
      }
    );
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

  openTransportOfferModal(offer: Transport){
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
