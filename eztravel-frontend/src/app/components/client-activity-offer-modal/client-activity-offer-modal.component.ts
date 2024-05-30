import { Component } from '@angular/core';
import { GetActivity } from '../../interfaces/get-activity';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-activity-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './client-activity-offer-modal.component.html',
  styleUrl: './client-activity-offer-modal.component.scss'
})
export class ClientActivityOfferModalComponent {
  offer!: GetActivity;
  faTrash = faTrash;
  
  constructor(public modalRef: MdbModalRef<ClientActivityOfferModalComponent>) { 
  }
}
