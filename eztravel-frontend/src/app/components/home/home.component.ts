import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { faPlane, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { lastValueFrom } from 'rxjs';
import { TripformService } from '../../services/tripform.service';
import { Tripform } from '../../interfaces/tripform';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, CommonModule, MdbFormsModule, ReactiveFormsModule, MdbValidationModule, FormsModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  validationForm: FormGroup;
  faPlane = faPlane;
  faLocation = faLocationCrosshairs;
  userId: string | null;
  locationNotFound: boolean = false;
  loading: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private tripformService: TripformService) {
    this.validationForm = this.formBuilder.group({
      destination: [null, Validators.required],
      currentLocation: [null, Validators.required],
      arrivalDate: [null, Validators.required],
      departureDate: [null, Validators.required],
      numberOfPeople: [null, Validators.required],
      budget: [null, Validators.required],
      userId: [null]
    });
    this.userId = localStorage.getItem('userID');
  }
  username = localStorage.getItem('username');

  async search() {
    this.validationForm.markAllAsTouched();
  
    if (this.validationForm.valid) {
      const tripform: Tripform = {
        destination: this.destination.value,
        currentLocation: this.currentLocation.value,
        arrivalDate: new Date(this.arrivalDate.value),
        departureDate: new Date(this.departureDate.value),
        numberOfPeople: this.numberOfPeople.value,
        budget: this.budget.value,
        userId: this.userId,
      };
  
      try {
        const response = await lastValueFrom(this.tripformService.createTripForm(tripform));
        console.log("Success! Response:", response);
        const tripID = response.id;
        console.log("TripID:", tripID);
        localStorage.setItem('tripID', tripID);
        this.navigateToResult();
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }
  
  getUserLocation() {
    this.loading = true;
    this.locationNotFound = false;
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData);
        if (jsonData.city) {
          this.currentLocation.setValue(jsonData.city);
        } else {
          this.locationNotFound = true;
        }
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.locationNotFound = true;
        this.loading = false;
      });
  }

  navigateToResult(){
    this.router.navigate(['search_results']);
  }

  get destination(): FormControl {
    return this.validationForm.get('destination') as FormControl;
  }

  get currentLocation(): FormControl {
    return this.validationForm.get('currentLocation') as FormControl;
  }

  get arrivalDate(): FormControl {
    return this.validationForm.get('arrivalDate') as FormControl;
  }

  get departureDate(): FormControl {
    return this.validationForm.get('departureDate') as FormControl;
  }

  get numberOfPeople(): FormControl {
    return this.validationForm.get('numberOfPeople') as FormControl;
  }

  get budget(): FormControl {
    return this.validationForm.get('budget') as FormControl;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }
}
