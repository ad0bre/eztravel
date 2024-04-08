import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransportComponent } from './add-transport.component';

describe('AddTransportComponent', () => {
  let component: AddTransportComponent;
  let fixture: ComponentFixture<AddTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTransportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
