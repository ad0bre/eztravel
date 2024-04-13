import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ImageSliderComponent, FontAwesomeModule, RouterOutlet, FormsModule, CommonModule, MdbFormsModule, MdbValidationModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  validationForm: FormGroup;
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;

  errorMessage: string = '';

  userNotFound: boolean = false;
  incorrectPass: boolean = false;

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

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.validationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login(){
    if(this.validationForm.valid){
      const user = {
        username: this.validationForm.value.username,
        password: this.validationForm.value.password
      };
  
      this.resetChecks();
    
      try{
        console.log(user.username, user.password);
        await this.authService.login(user).toPromise();
        console.log("Successful login!");
        localStorage.setItem('username', user.username);
        this.navigateToHome();
      } catch (error) {
        if(error instanceof HttpErrorResponse){
          this.checkErrorType(error.status);
        }
        console.error("Login error:", error);
      }
    }
    
  }  

  checkErrorType(status: number){
    if(status == 400 || status == 401){
      this.resetChecks();
      this.userNotFound = true;
    }
  }

  resetChecks(){
    this.userNotFound = false;
    this.incorrectPass = false
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
  navigateToLanding(){
    this.router.navigate(['']);
  }
  navigateToHome(){
    this.router.navigate(['/vendor-home']);
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }
}
