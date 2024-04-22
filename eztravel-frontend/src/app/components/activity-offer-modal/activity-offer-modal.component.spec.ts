import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOfferModalComponent } from './activity-offer-modal.component';

describe('ActivityOfferModalComponent', () => {
  let component: ActivityOfferModalComponent;
  let fixture: ComponentFixture<ActivityOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
