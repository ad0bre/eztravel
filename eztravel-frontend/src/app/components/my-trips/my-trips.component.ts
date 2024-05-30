import { Component, OnInit } from '@angular/core';
import { TripformService } from '../../services/tripform.service';
import { GetTrip } from '../../interfaces/get-trip';
import { GetTransport } from '../../interfaces/get-transport';
import { GetAccomodation } from '../../interfaces/get-accomodation';
import { GetActivity } from '../../interfaces/get-activity';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './my-trips.component.html',
  styleUrl: './my-trips.component.scss',
  animations: [
    trigger('countAnimation', [
      transition('* => *', [
        animate('1s', keyframes([
          style({ opacity: 0, transform: 'translateY(-20px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class MyTripsComponent implements OnInit{
  userId: string | null;
  offers: GetTrip[] = [];
  transports: GetTransport[] = [];
  accomodations: GetAccomodation[] = [];
  activities: GetActivity[] = [];

  loading: boolean = true;
  offersLength: number = 0;

  constructor(private tripService: TripformService, private router: Router){
    this.userId = localStorage.getItem('userID');
  }
  ngOnInit(): void {
    this.listOffers();
  }

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

  viewTrip(tripId: string) {
    this.router.navigate(['/trip', tripId]);
  }

  incrementOffersLength() {
    const interval = setInterval(() => {
      if (this.offersLength < 10) { // Change 10 to the desired final number
        this.offersLength++;
      } else {
        clearInterval(interval);
      }
    }, 300); // Change 300 to the desired interval between increments
  }
}
