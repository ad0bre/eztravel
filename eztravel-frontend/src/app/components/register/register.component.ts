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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ImageSliderComponent, FontAwesomeModule, RouterOutlet, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;

  receivedError: HttpErrorResponse | undefined;
  errorMessage: string = '';
  
  emptyEmail: boolean = false;
  emptyUser: boolean = false;
  emptyPass: boolean = false;

  email: string = '';
  username: string = '';
  password: string = '';

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

  constructor(private router: Router, private authService: AuthService){}

  async register(){
    const user = {
      email: this.email,
      username: this.username,
      password: this.password
    };

    try{
      await lastValueFrom(this.authService.register(user));
          console.log("successfull!");
          this.navigateToHome();
        } catch (error) {
          if(error instanceof HttpErrorResponse){
            this.receivedError = error;
            console.log(this.receivedError);
            this.checkErrorType();
          }
          console.log(this.errorMessage, error);
        }
  }

  checkErrorType(){
    if(this.email == ''){
      this.resetChecks();
      this.emptyEmail = true;
    }
    if(this.username == ''){
      this.resetChecks();
      this.emptyUser = true;
    }
    if(this.password == ''){
      this.resetChecks();
      this.emptyPass = true;
    }
  }

  resetChecks(){
    this.emptyEmail = false;
    this.emptyPass = false;
    this.emptyUser = false;
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
}
