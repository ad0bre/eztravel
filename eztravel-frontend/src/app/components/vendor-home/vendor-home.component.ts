import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalAccomodationComponent } from '../modal-accomodation/modal-accomodation.component';
import { ModalComponent } from '../modal/modal.component';
import { ModalActivityComponent } from '../modal-activity/modal-activity.component';

@Component({
  selector: 'app-vendor-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './vendor-home.component.html',
  styleUrl: './vendor-home.component.scss'
})
export class VendorHomeComponent implements OnInit{
  username: string | null;

  modalRefTransport: MdbModalRef<ModalComponent> | null = null;
  modalRefAccomodation: MdbModalRef<ModalAccomodationComponent> | null = null;
  modalRefActivity: MdbModalRef<ModalActivityComponent> | null = null;

  constructor(private modalService: MdbModalService) {
    this.username = null;
  }

  ngOnInit(): void {
      this.username = localStorage.getItem('username');
  }

  openTransportModal(){
    this.modalRefTransport = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-scrollable'
    })
  }

  openAccomodationModal(){
    this.modalRefAccomodation = this.modalService.open(ModalAccomodationComponent, {
      modalClass: 'modal-dialog-scrollable'
    })
  }

  openActivityModal(){
    this.modalRefActivity = this.modalService.open(ModalActivityComponent, {
      modalClass: 'modal-dialog-scrollable'
    })
  }
}
