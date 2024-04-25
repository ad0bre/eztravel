import { Component } from '@angular/core';
import { GetActivity } from '../../interfaces/get-activity';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-offer-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './activity-offer-modal.component.html',
  styleUrl: './activity-offer-modal.component.scss'
})
export class ActivityOfferModalComponent {
  offer!: GetActivity;
  faTrash = faTrash;
  
  constructor(public modalRef: MdbModalRef<ActivityOfferModalComponent>, private activityService: ActivityService) { 
  }

  deleteOffer(){
    this.activityService.deleteActivity(this.offer.id).subscribe(
      () => {
        console.log("Activity deleted successfully!");
        this.modalRef.close();
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
