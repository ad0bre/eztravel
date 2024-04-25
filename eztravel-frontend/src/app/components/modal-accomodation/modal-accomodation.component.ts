import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef} from 'mdb-angular-ui-kit/modal';
import { lastValueFrom } from 'rxjs';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccomodationService } from '../../services/accomodation.service';

@Component({
  selector: 'app-modal-accomodation',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './modal-accomodation.component.html',
  styleUrl: './modal-accomodation.component.scss'
})
export class ModalAccomodationComponent{
  validationForm: FormGroup;

  profileId: string | null;

  constructor(public modalRef: MdbModalRef<ModalAccomodationComponent>, private accomodationService: AccomodationService){
    this.validationForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required }),
      description: new FormControl(null, { validators: Validators.required }),
      location: new FormControl(null, { validators: Validators.required }),
      checkIn: new FormControl(null, { validators: Validators.required }),
      checkOut: new FormControl(null, { validators: Validators.required }),
      people: new FormControl(null, { validators: Validators.required }),
      priority: new FormControl(null, { validators: Validators.required }),
      profileId: new FormControl(null),
    });
    this.profileId = localStorage.getItem('profileID');
  }
  
  async createAccomodation() {
    this.validationForm.markAllAsTouched();

    if (this.validationForm.valid) {
      const accommodation = {
        name: this.name.value,
        description: this.description.value,
        location: this.location.value,
        checkIn: new Date(this.checkIn.value),
        checkOut: new Date(this.checkOut.value),
        people: this.people.value,
        priority: this.priority.value,
        profileId: this.profileId,
      };
  
      try {
        await lastValueFrom(this.accomodationService.createAccomodation(accommodation));
        console.log("successful!");
      } catch (error) {
        console.log("error", error);
      }
  
      this.modalRef.close();
      window.location.reload();
    }
  }

  get name(): FormControl {
    return this.validationForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.validationForm.get('description') as FormControl;
  }

  get location(): FormControl {
    return this.validationForm.get('location') as FormControl;
  }

  get checkIn(): FormControl {
    return this.validationForm.get('checkIn') as FormControl;
  }

  get checkOut(): FormControl {
    return this.validationForm.get('checkOut') as FormControl;
  }

  get people(): FormControl {
    return this.validationForm.get('people') as FormControl;
  }

  get priority(): FormControl {
    return this.validationForm.get('priority') as FormControl;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }
}