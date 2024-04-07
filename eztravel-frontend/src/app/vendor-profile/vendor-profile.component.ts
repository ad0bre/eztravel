import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './vendor-profile.component.html',
  styleUrl: './vendor-profile.component.scss'
})
export class VendorProfileComponent {
  
}
