import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef} from 'mdb-angular-ui-kit/modal';
import { lastValueFrom } from 'rxjs';
import { TransportService } from '../../services/transport.service';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccomodationService } from '../../services/accomodation.service';

@Component({
  selector: 'app-modal-accomodation',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './modal-accomodation.component.html',
  styleUrl: './modal-accomodation.component.scss'
})
export class ModalAccomodationComponent {
  validationForm: FormGroup;

  constructor(public modalRef: MdbModalRef<ModalAccomodationComponent>, private accomodationService: AccomodationService){
    this.validationForm = new FormGroup({
      id: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      name: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      description: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      location: new FormControl(null, { validators: Validators.required, updateOn: 'submit'}),
      checkIn: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      checkOut: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      people: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      priority: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      userId: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
  }

  async createAccomodation() {
    if (this.validationForm.valid) {
      const accomodation = {
        id: this.validationForm.get('id')?.value,
        name: this.validationForm.get('name')?.value,
        description: this.validationForm.get('description')?.value,
        location: this.validationForm.get('location')?.value,
        checkIn: new Date(this.checkIn.value),
        checkOut: new Date(this.checkOut.value),
        people: this.validationForm.get('people')?.value,
        priority: this.validationForm.get('priority')?.value,
        userId: this.validationForm.get('userId')?.value,
      };
  
      try {
        await lastValueFrom(this.accomodationService.createTransport(accomodation));
        console.log("successful!");
      } catch (error) {
        console.log("error", error);
      }
  
      this.modalRef.close();
    }
  }

  get id(): AbstractControl {
    return this.validationForm.get('id')!;
  }

  get name(): AbstractControl {
    return this.validationForm.get('name')!;
  }

  get description(): AbstractControl {
    return this.validationForm.get('description')!;
  }

  get location(): AbstractControl {
    return this.validationForm.get('location')!;
  }

  get checkIn(): AbstractControl {
    return this.validationForm.get('checkIn')!;
  }

  get checkOut(): AbstractControl {
    return this.validationForm.get('checkOut')!;
  }

  get people(): AbstractControl {
    return this.validationForm.get('people')!;
  }

  get priority(): AbstractControl {
    return this.validationForm.get('priority')!;
  }

  get userId(): AbstractControl {
    return this.validationForm.get('userId')!;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }
}