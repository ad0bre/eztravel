import { Component, OnDestroy } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ImageSliderComponent, FontAwesomeModule, RouterOutlet, FormsModule, HttpClientModule, CommonModule, MdbFormsModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  validationForm: FormGroup;
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;

  alreadyExists: boolean = false;
  invalidEmail: boolean = false;

  receivedError: HttpErrorResponse | undefined;
  errorMessage: string = '';
  errorBody: any;

  slides: any[] = [
    {
      url: '../assets/slideshowPic.jpg',
      title: 'First slide',
    },
    {
      url: '../assets/slideshowPic6.jpg',
      title: 'Second slide',
    },
    {
      url: '../assets/slideshowPic2.jpg',
      title: 'Third slide',
    },
    {
      url: '../assets/slideshowPic3.jpg',
      title: 'Fourth slide',
    },
    {
      url: '../assets/slideshowPic4.jpg',
      title: 'Fifth slide',
    },
    {
      url: '../assets/slideshowPic5.jpg',
      title: 'Sixth slide',
    },
  ];

  constructor(private router: Router, private authService: AuthService){
    this.validationForm = new FormGroup({
      email: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      username: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      password: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
    });
  }

  async register(){
    const user = {
      email: this.validationForm.get('email')?.value,
      username: this.validationForm.get('username')?.value,
      password: this.validationForm.get('password')?.value
    };

    try{
      await lastValueFrom(this.authService.register(user));
          console.log(user.email, user.username, user.password);
          console.log("successfull!");
          this.navigateToHome();
        } catch (error) {
          if(error instanceof HttpErrorResponse){
            this.receivedError = error;
            this.checkError(error);
            console.log(this.receivedError);
          }
          console.log(this.errorMessage, error);
        }
  }

  checkError(error: HttpErrorResponse){
    if(error.error == 'Email or username already in use'){
      this.resetChecks();
      this.alreadyExists = true;
    }
    if(error.error.errors && error.error.errors.Email && error.error.errors.Email.length > 0){
      this.resetChecks();
      this.invalidEmail = true;
    }
  }

  resetChecks(){
    this.alreadyExists = false;
    this.invalidEmail = false;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToLanding(){
    this.router.navigate(['']);
  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }

  get email(): AbstractControl {
    return this.validationForm.get('email')!;
  }

  get username(): AbstractControl {
    return this.validationForm.get('username')!;
  }

  get password(): AbstractControl {
    return this.validationForm.get('password')!;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
    if (this.validationForm.valid) {
      this.register();
    }
  }
}
