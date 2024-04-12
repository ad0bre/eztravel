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

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  validationForm: FormGroup;

  constructor(public modalRef: MdbModalRef<ModalComponent>, private transportService: TransportService){
    this.validationForm = new FormGroup({
      id: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      name: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      description: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      departureLocation: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      arrivalLocation: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      departureTime: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      arrivalTime: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      price: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      type: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      capacity: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      userId: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
  }

  async createTransport() {
    if (this.validationForm.valid) {
      const transport = {
        id: this.validationForm.get('id')?.value,
        name: this.validationForm.get('name')?.value,
        description: this.validationForm.get('description')?.value,
        departureLocation: this.validationForm.get('departureLocation')?.value,
        arrivalLocation: this.validationForm.get('arrivalLocation')?.value,
        departureTime: new Date(this.departureTime.value),
        arrivalTime: new Date(this.arrivalTime.value),
        price: this.validationForm.get('price')?.value,
        type: this.validationForm.get('type')?.value,
        capacity: this.validationForm.get('capacity')?.value,
        userId: this.validationForm.get('userId')?.value,
      };
  
      try {
        await lastValueFrom(this.transportService.createTransport(transport));
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

  get departureLocation(): AbstractControl {
    return this.validationForm.get('departureLocation')!;
  }

  get arrivalLocation(): AbstractControl {
    return this.validationForm.get('arrivalLocation')!;
  }

  get departureTime(): AbstractControl {
    return this.validationForm.get('departureTime')!;
  }

  get arrivalTime(): AbstractControl {
    return this.validationForm.get('arrivalTime')!;
  }

  get price(): AbstractControl {
    return this.validationForm.get('price')!;
  }

  get type(): AbstractControl {
    return this.validationForm.get('type')!;
  }

  get capacity(): AbstractControl {
    return this.validationForm.get('capacity')!;
  }

  get userId(): AbstractControl {
    return this.validationForm.get('userId')!;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }
}