import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccomodationComponent } from './modal-accomodation.component';

describe('ModalAccomodationComponent', () => {
  let component: ModalAccomodationComponent;
  let fixture: ComponentFixture<ModalAccomodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAccomodationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAccomodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
