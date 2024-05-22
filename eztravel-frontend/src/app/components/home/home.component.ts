import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, CommonModule, MdbFormsModule, ReactiveFormsModule, MdbValidationModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  validationForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.validationForm = this.formBuilder.group({
      destination: new FormControl(null, {validators: Validators.required}),
      leavingDate: new FormControl(null, {validators: Validators.required}),
      returningDate: new FormControl(null, {validators: Validators.required}),
      people: new FormControl(null, {validators: Validators.required}),
      budget: new FormControl(null, {validators: Validators.required}),
    });
   }
  username = localStorage.getItem('username');

  navigateToResult(){
    this.router.navigate(['search_results']);
  }

  get destination(): FormControl {
    return this.validationForm.get('destination') as FormControl;
  }

  get leavingDate(): FormControl {
    return this.validationForm.get('leavingDate') as FormControl;
  }

  get returningDate(): FormControl {
    return this.validationForm.get('returningDate') as FormControl;
  }

  get people(): FormControl {
    return this.validationForm.get('people') as FormControl;
  }

  get budget(): FormControl {
    return this.validationForm.get('budget') as FormControl;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
  }
}
