import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {
  @Input() slides: any[] = [];
  @Input() autoPlay = true;
  @Input() animationSpeed = 1000;

  hidden = false;
  currentSlide = 0;

  nextSlide(){
    let currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.jumpToSlide(currentSlide);
  }

  jumpToSlide(index: number){
    this.hidden = true;
    setTimeout(() => {
      this.currentSlide = index;
      this.hidden = false;
    }, this.animationSpeed);
  }

  constructor(){
    if(this.autoPlay){
      setInterval(() => {
        this.nextSlide();
      }, 5000);
    }
  }
}
