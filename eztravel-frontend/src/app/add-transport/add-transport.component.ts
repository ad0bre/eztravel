import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-transport',
  standalone: true,
  imports: [],
  templateUrl: './add-transport.component.html',
  styleUrl: './add-transport.component.scss'
})
export class AddTransportComponent {
  constructor(public modalRef: MdbModalRef<ModalCom)
}
