import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccomodationOfferModalComponent } from './client-accomodation-offer-modal.component';

describe('ClientAccomodationOfferModalComponent', () => {
  let component: ClientAccomodationOfferModalComponent;
  let fixture: ComponentFixture<ClientAccomodationOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAccomodationOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientAccomodationOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
