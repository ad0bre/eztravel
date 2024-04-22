import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationOfferModalComponent } from './accomodation-offer-modal.component';

describe('AccomodationOfferModalComponent', () => {
  let component: AccomodationOfferModalComponent;
  let fixture: ComponentFixture<AccomodationOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomodationOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomodationOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
