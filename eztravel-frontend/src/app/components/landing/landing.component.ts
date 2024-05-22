import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterOutlet } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, ImageSliderComponent, FontAwesomeModule, MdbRippleModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(-100%)', opacity: 0 })),
      state('*', style({ transform: 'translateX(0)', opacity: 1 })),
      transition(':enter', [
        animate('1200ms ease-in')
      ])
    ])
  ]
})
export class LandingComponent {
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

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToRegister(){
    this.router.navigate(['/register']);
  }
  navigateToLanding(){
    this.router.navigate(['']);
  }
}
