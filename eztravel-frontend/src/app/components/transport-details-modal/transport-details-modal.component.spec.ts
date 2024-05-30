import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportDetailsModalComponent } from './transport-details-modal.component';

describe('TransportDetailsModalComponent', () => {
  let component: TransportDetailsModalComponent;
  let fixture: ComponentFixture<TransportDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
