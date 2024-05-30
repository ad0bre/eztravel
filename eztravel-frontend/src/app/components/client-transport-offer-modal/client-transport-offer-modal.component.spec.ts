import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTransportOfferModalComponent } from './client-transport-offer-modal.component';

describe('ClientTransportOfferModalComponent', () => {
  let component: ClientTransportOfferModalComponent;
  let fixture: ComponentFixture<ClientTransportOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTransportOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientTransportOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
