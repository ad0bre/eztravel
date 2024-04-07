import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-vendor-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './vendor-home.component.html',
  styleUrl: './vendor-home.component.scss'
})
export class VendorHomeComponent {

}
