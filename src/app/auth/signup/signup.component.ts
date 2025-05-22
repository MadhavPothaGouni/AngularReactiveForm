import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  private destroyref = inject(DestroyRef)
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required],
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    Street: new FormControl('', {
      validators: [Validators.required],
    }),
    number: new FormControl('', {
      validators: [Validators.required],
    }),
    postalcode: new FormControl('', {
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  ngOnInit() {
    const subscribition =  this.form.valueChanges.subscribe({
      next: (value) =>
        window.localStorage.setItem(
          'savedvalues',
          JSON.stringify({ email: value.email, password: value.password ,
            confirmPassword:value.confirmPassword, fristName: value.firstName, lastName:value.lastName,
            Street:value.Street, number:value.number, postalcode:value.postalcode, city:value.city
          })
        ),
    })
    this.destroyref.onDestroy(()=>{
      subscribition.unsubscribe();
    })
  }
  onSubmit() {
    console.log(this.form);
  }
  onReset() {
    this.form.reset();
  }
}
