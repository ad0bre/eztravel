import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalRef} from 'mdb-angular-ui-kit/modal';
import { TransportService } from '../services/transport.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MdbModalModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  id: string = '';
  name: string = '';
  description: string = '';
  departureLocation: string = '';
  arrivalLocation: string = '';
  departureTime: Date = new Date();
  arrivalTime: Date = new Date();
  price: number = 0;
  type: string = '';
  capacity: number = 0;
  userId: string = '';

  constructor(public modalRef: MdbModalRef<ModalComponent>, private transportService: TransportService){}

  async createTransport(){
    const transport = {
      id: this.id,
      name: this.name,
      description: this.description,
      departureLocation: this.departureLocation,
      arrivalLocation: this.arrivalLocation,
      departureTime: new Date(this.departureTime), // Convert date string to Date object
      arrivalTime: new Date(this.arrivalTime),
      price: this.price,
      type: this.type,
      capacity: this.capacity,
      userId: this.userId
    };

    try{
      await lastValueFrom(this.transportService.createTransport(transport));
        console.log("successfull!");
    } catch(error){
      console.log("error", error);
    }
  }
}