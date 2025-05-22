import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { debounceTime, of } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// custom validators below
function containerquestyionmark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesnotcontainerquestionmarkup: true };
}
function uniqueemail(control: AbstractControl) {
  if (control.value !== 'admin@example.com') {
    return of(null);
  }
  return of({ notUnique: true });
}
let initialemailvalue='';
const savedemail = window.localStorage.getItem('saved-login.value');
if(savedemail){
  const loadedemail = JSON.parse(savedemail);
  initialemailvalue = loadedemail;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  private destroyref = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialemailvalue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [uniqueemail]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        containerquestyionmark,
      ],
    }),
  });
  ngOnInit() {
    const subscribition = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) =>
        window.localStorage.setItem(
          'saved-login-value',
          JSON.stringify({ email: value.email ,
            password: value.password
          })
        ),
    })
    this.destroyref.onDestroy(()=> subscribition.unsubscribe());
  }
  onSubmit() {
    // ** The below addValidators can be used and this more advanced instead of using validators in LoginComponent **
    // this.form.controls.email.addValidators
    console.log(this.form);
    const enteremail = this.form.value.email;
    const enteredpassword = this.form.value.password;
    console.log(enteremail, enteredpassword);
  }
  get isemailvalid() {
    return (
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid &&
      this.form.controls.email.touched
    );
  }
  get ispasswordvalid() {
    return (
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid &&
      this.form.controls.password.touched
    );
  }
}
