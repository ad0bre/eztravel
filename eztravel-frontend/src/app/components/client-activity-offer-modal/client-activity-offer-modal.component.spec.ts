import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientActivityOfferModalComponent } from './client-activity-offer-modal.component';

describe('ClientActivityOfferModalComponent', () => {
  let component: ClientActivityOfferModalComponent;
  let fixture: ComponentFixture<ClientActivityOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientActivityOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientActivityOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
