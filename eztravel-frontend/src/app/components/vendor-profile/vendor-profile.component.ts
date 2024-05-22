import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../services/user-profile.service';
import { lastValueFrom } from 'rxjs';
import { GetUserProfile } from '../../interfaces/get-user-profile';

@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [HeaderComponent, MdbFormsModule, CommonModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './vendor-profile.component.html',
  styleUrl: './vendor-profile.component.scss'
})
export class VendorProfileComponent implements OnInit {
  validationForm: FormGroup;

  roles: string[];
  selectedRole: string;
  userID: string | null;
  isVerified: boolean = false;

  loadProfile: boolean = true;

  constructor(private router: Router, private userProfileService: UserProfileService) {
    this.validationForm = new FormGroup({
      name: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      email: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      phone: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      role: new FormControl(null, { validators: Validators.required }),
    });
    this.roles = ['Traveler', 'Vendor'];
    this.selectedRole = '';
    this.userID = localStorage.getItem('userID');
  }
  ngOnInit(): void {
    this.loadUserProfile();
  }

  async saveChanges(){
    const userProfile = {
      name: this.validationForm.get('name')?.value,
      email: this.validationForm.get('email')?.value,
      phone: this.validationForm.get('phone')?.value,
      userId: this.userID,
      isVerified: this.isVerified,
      type: this.getUserType()
    };

    try{
      await lastValueFrom(this.userProfileService.createUserProfile(userProfile));
      console.log("Profile saved!");
    } catch (error){
      console.log(error);
    }
  }

  async loadUserProfile(){
    this.userProfileService.getUserProfiles().subscribe((userProfiles: GetUserProfile[]) => {
      const foundUserProfile = userProfiles.find(userProfile => userProfile.userId === this.userID);
      if(foundUserProfile){
        console.log('User Profile:', foundUserProfile);
        this.validationForm.patchValue({
          name: foundUserProfile.name,
          email: foundUserProfile.email === null ? localStorage.getItem('email') : foundUserProfile.email,
          phone: foundUserProfile.phone,
          type: foundUserProfile.type === 1 ? 'Vendor' : 'Traveler' 
        });
        this.selectedRole = foundUserProfile.type === 1 ? 'Vendor' : 'Traveler';
        this.isVerified = foundUserProfile.isVerified;
        this.loadProfile = false;
      } else {
        console.log('User profile not found!');
        this.loadProfile = false;
      }
    })
  }

  signOut(){
    this.router.navigate(['']);
  }

  get name(): AbstractControl {
    return this.validationForm.get('name')!;
  }

  get email(): AbstractControl {
    return this.validationForm.get('email')!;
  }

  get phone(): AbstractControl {
    return this.validationForm.get('phone')!;
  }

  getUserType():number{
    if(this.selectedRole == 'Vendor'){
      return 1;
    }
    return 0;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
    if (this.validationForm.valid) {
      this.saveChanges();
    }
  }
}
