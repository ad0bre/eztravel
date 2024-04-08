import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './vendor-profile.component.html',
  styleUrl: './vendor-profile.component.scss'
})
export class VendorProfileComponent {
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private router: Router, private modalService: MdbModalService) {}

  openModal(){
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered'
    })
  }

  signOut(){
    this.router.navigate(['']);
  }
}
