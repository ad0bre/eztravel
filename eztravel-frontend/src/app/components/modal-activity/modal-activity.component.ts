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

  profileId: string | null;

  constructor(public modalRef: MdbModalRef<ModalActivityComponent>, private activityService: ActivityService){
    this.validationForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required}),
      description: new FormControl(null, { validators: Validators.required}),
      type: new FormControl(null, { validators: Validators.required}),
      address: new FormControl(null, { validators: Validators.required}),
      priority: new FormControl(null, { validators: Validators.required}),
      profileId: new FormControl(null),
    });
    this.profileId = localStorage.getItem('profileID');
  }

  async createActivity(){
    this.validationForm.markAllAsTouched();

    if(this.validationForm.valid){
      const activity = {
        name: this.name.value,
        description: this.description.value,
        type: this.type.value,
        address: this.address.value,
        priority: this.priority.value,
        profileId: this.profileId,
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

  get name(): FormControl {
    return this.validationForm.get('name') as FormControl;
  }
  get description(): FormControl {
    return this.validationForm.get('description') as FormControl;
  }
  get type(): FormControl {
    return this.validationForm.get('type') as FormControl;
  }
  get address(): FormControl {
    return this.validationForm.get('address') as FormControl;
  }
  get priority(): AbstractControl {
    return this.validationForm.get('priority')!;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }

}
