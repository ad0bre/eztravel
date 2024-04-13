import { Component } from '@angular/core';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ActivityService } from '../../services/activity.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-activity',
  standalone: true,
  imports: [MdbValidationModule, ReactiveFormsModule, MdbFormsModule, CommonModule, FormsModule],
  templateUrl: './modal-activity.component.html',
  styleUrl: './modal-activity.component.scss'
})
export class ModalActivityComponent {
  validationForm: FormGroup;

  constructor(public modalRef: MdbModalRef<ModalActivityComponent>, private activityService: ActivityService){
    this.validationForm = new FormGroup({
      id: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      name: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      description: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      type: new FormControl(null, { validators: Validators.required, updateOn: 'submit'}),
      address: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      priority: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      userId: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
  }

  async createActivity(){
    if(this.validationForm.valid){
      const activity = {
        id: this.validationForm.get('id')?.value,
        name: this.validationForm.get('name')?.value,
        description: this.validationForm.get('description')?.value,
        type: this.validationForm.get('type')?.value,
        address: this.validationForm.get('address')?.value,
        priority: this.validationForm.get('priority')?.value,
        userId: this.validationForm.get('userId')?.value,
      };

      try{
        await lastValueFrom(this.activityService.createActivity(activity));
        console.log("Created activity");
      } catch (error){
        console.log("Error", error);
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
  get type(): AbstractControl {
    return this.validationForm.get('type')!;
  }
  get address(): AbstractControl {
    return this.validationForm.get('address')!;
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
