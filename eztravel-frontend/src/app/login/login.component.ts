import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ImageSliderComponent, FontAwesomeModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;

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

  constructor(private router: Router){}

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
