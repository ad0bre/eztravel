import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationDetailsModalComponent } from './accomodation-details-modal.component';

describe('AccomodationDetailsModalComponent', () => {
  let component: AccomodationDetailsModalComponent;
  let fixture: ComponentFixture<AccomodationDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomodationDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccomodationDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
