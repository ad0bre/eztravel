import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ImageSliderComponent, FontAwesomeModule, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;

  username: string = '';
  password: string = '';

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

  constructor(private router: Router, private authService: AuthService){}

  async login(){
    const user = {
      username: this.username,
      password: this.password
    };

    try{
      await lastValueFrom(this.authService.login(user));
          console.log("successfull!");
          this.navigateToHome();
        } catch (error) {
          if(error instanceof HttpErrorResponse){
            this.errorMessage = error.statusText;
            this.checkErrorType(this.errorMessage);
            this.errorMessage = '';
          }
          console.log(this.errorMessage, error);
        }
  }

  checkErrorType(error: string){
    if(error == 'Not Found'){
      this.resetChecks();
      this.userNotFound = true;
    } else if(error == 'Unauthorized'){
      this.resetChecks();
      this.incorrectPass = true;
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
}
