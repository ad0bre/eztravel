import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef} from 'mdb-angular-ui-kit/modal';
import { lastValueFrom } from 'rxjs';
import { TransportService } from '../../services/transport.service';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  validationForm: FormGroup;
  profileId: string | null;

  constructor(public modalRef: MdbModalRef<ModalComponent>, private transportService: TransportService) {
    this.validationForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required }),
      description: new FormControl(null, { validators: Validators.required }),
      departureLocation: new FormControl(null, { validators: Validators.required }),
      arrivalLocation: new FormControl(null, { validators: Validators.required }),
      departureTime: new FormControl(null, { validators: Validators.required }),
      arrivalTime: new FormControl(null, { validators: Validators.required }),
      price: new FormControl(null, { validators: Validators.required }),
      type: new FormControl(null, { validators: Validators.required }),
      capacity: new FormControl(null, { validators: Validators.required }),
      profileId: new FormControl(null),
      priority: new FormControl(null, { validators: Validators.required }),
    });
    this.profileId = localStorage.getItem('profileID');
  }

  async createTransport() {
    console.log("createTransport() method called");
    console.log("Form validity:", this.validationForm.valid);

    this.validationForm.markAllAsTouched();

    if (this.validationForm.valid) {
      const transport = {
        name: this.validationForm.get('name')?.value,
        description: this.validationForm.get('description')?.value,
        departureLocation: this.validationForm.get('departureLocation')?.value,
        arrivalLocation: this.validationForm.get('arrivalLocation')?.value,
        departureTime: new Date(this.validationForm.get('departureTime')?.value),
        arrivalTime: new Date(this.validationForm.get('arrivalTime')?.value),
        price: this.validationForm.get('price')?.value,
        type: this.validationForm.get('type')?.value,
        capacity: this.validationForm.get('capacity')?.value,
        profileId: this.profileId,
        priority: this.validationForm.get('priority')?.value,
      };
      try {
        console.log("Transport object:", transport);
        await lastValueFrom(this.transportService.createTransport(transport));
        console.log("successful!");
        this.modalRef.close();
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  get name(): FormControl {
    return this.validationForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.validationForm.get('description') as FormControl;
  }

  get departureLocation(): FormControl {
    return this.validationForm.get('departureLocation') as FormControl;
  }

  get arrivalLocation(): FormControl {
    return this.validationForm.get('arrivalLocation') as FormControl;
  }

  get departureTime(): FormControl {
    return this.validationForm.get('departureTime') as FormControl;
  }

  get arrivalTime(): FormControl {
    return this.validationForm.get('arrivalTime') as FormControl;
  }

  get price(): FormControl {
    return this.validationForm.get('price') as FormControl;
  }

  get type(): FormControl {
    return this.validationForm.get('type') as FormControl;
  }

  get capacity(): FormControl {
    return this.validationForm.get('capacity') as FormControl;
  }

  get priority(): FormControl {
    return this.validationForm.get('priority') as FormControl;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }
}