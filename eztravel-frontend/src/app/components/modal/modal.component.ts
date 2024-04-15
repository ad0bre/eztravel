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
import { UserService } from '../../services/user.service';
import { UserGet } from '../../interfaces/user-get';
import { UserProfileService } from '../../services/user-profile.service';
import { GetUserProfile } from '../../interfaces/get-user-profile';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{
  validationForm: FormGroup;

  profileId: string;

  constructor(public modalRef: MdbModalRef<ModalComponent>, private transportService: TransportService, private userService: UserService, private userProfileService: UserProfileService){
    this.validationForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      description: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      departureLocation: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      arrivalLocation: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      departureTime: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      arrivalTime: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      price: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      type: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      capacity: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      profileId: new FormControl(null),
      priority: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
    this.profileId = '';
  }
  async ngOnInit(): Promise<void> {
    const username = localStorage.getItem('username')
    await this.findUserProfile(username);
  }

  async createTransport() {
    console.log("createTransport() method called");
    const username = localStorage.getItem('username');
    try {
      await this.findUserProfile(username);
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
        console.log("Transport object:", transport);
        await lastValueFrom(this.transportService.createTransport(transport));
        console.log("successful!");
        this.modalRef.close();
      } else {
        console.log("Form is invalid");
      }
    } catch (error) {
      console.log("error", error);
    }
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

  get priority(): AbstractControl {
    return this.validationForm.get('priority')!;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }

  findUserProfile(username: string | null): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.userService.getUsers().subscribe((users: UserGet[]) => {
            const foundUser = users.find(user => user.userName === username);
            if (foundUser) {
                console.log('User found:', foundUser);
                const userID = foundUser.id;
                this.userProfileService.getUserProfiles().subscribe((userProfiles: GetUserProfile[]) => {
                    const foundUserProfile = userProfiles.find(userProfile => userProfile.userId === userID);
                    if (foundUserProfile) {
                        this.profileId = foundUserProfile.id;
                        console.log('User Profile:', foundUserProfile);
                    } else {
                        console.log('User profile not found!');
                    }
                    resolve();
                }, (error) => {
                    reject(error);
                });
                localStorage.setItem('userID', foundUser.id);
            } else {
                console.log("User not found");
                resolve();
            }
        }, (error) => {
            console.log(error);
            reject(error);
        });
    });
}
}