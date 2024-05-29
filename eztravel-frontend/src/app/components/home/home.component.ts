import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
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
  userId: string | null;

  constructor(private router: Router, private formBuilder: FormBuilder, private tripformService: TripformService) {
    this.validationForm = this.formBuilder.group({
      userId: [null],
      destination: [null, Validators.required],
      arrivalDay: [null, Validators.required],
      departureDay: [null, Validators.required],
      numberOfPeople: [null, Validators.required],
      budget: [null, Validators.required],
    });
    this.userId = localStorage.getItem('userID');
  }
  username = localStorage.getItem('username');

  async search() {
    this.validationForm.markAllAsTouched();
  
    if (this.validationForm.valid) {
      const tripform: Tripform = {
        userId: this.userId,
        destination: this.destination.value,
        arrivalDay: this.formatDate(this.arrivalDay.value),
        departureDay: this.formatDate(this.departureDay.value),
        numberOfPeople: this.numberOfPeople.value,
        budget: this.budget.value,
      };

      // Log the JSON structure
      console.log("Tripform JSON structure:", JSON.stringify(tripform, null, 2));
      
      try {
        await lastValueFrom(this.tripformService.createTripForm(tripform));
        console.log("Success!");
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  formatDate(date: any): string {
    const parsedDate = new Date(date);
  
    if (!isNaN(parsedDate.getTime())) {
      const year = parsedDate.getFullYear();
      const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
      const day = parsedDate.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      console.error("Invalid date provided:", date);
      return '';
    }
  }

  navigateToResult(){
    this.router.navigate(['search_results']);
  }

  get destination(): FormControl {
    return this.validationForm.get('destination') as FormControl;
  }

  get arrivalDay(): FormControl {
    return this.validationForm.get('arrivalDay') as FormControl;
  }

  get departureDay(): FormControl {
    return this.validationForm.get('departureDay') as FormControl;
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
