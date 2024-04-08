import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './vendor-profile.component.html',
  styleUrl: './vendor-profile.component.scss'
})
export class VendorProfileComponent {
  constructor(private router: Router) {}

  signOut(){
    this.router.navigate(['']);
  }
}
