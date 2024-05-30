import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { TripformService } from '../../services/tripform.service';
import { GetTrip } from '../../interfaces/get-trip';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  userId: string | null;
  offers: GetTrip[] = [];

  constructor(private tripService: TripformService) {
    this.userId = localStorage.getItem('userID');
    console.log("User ID:", this.userId);
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
        },
        (error) => {
          console.error('Error fetching offers:', error);
        }
      );
    } else {
      console.error('No user ID found');
    }
  }
}
