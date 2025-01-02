import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  confirmPasswordValidator,
  lowerCase,
  noDigit,
  specialChar,
  upperCase,
} from '../../validators/password.validators';
import {
  endWithSpace,
  invalidChar,
  letterOrNumber,
} from '../../validators/username.validator';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin = true;
  isOtp = false;
  isLoading = false;
  loginForm: FormGroup;
  signupForm: FormGroup;
  otpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            invalidChar,
            letterOrNumber,
            endWithSpace,
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            upperCase,
            lowerCase,
            noDigit,
            specialChar,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );

    this.otpForm = this.fb.group({
      otp: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      // Add your login logic here
    }
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup:', this.signupForm.value);
      // Add your signup logic here
    }
  }
  onOtpSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup:', this.signupForm.value);
      // Add your signup logic here
    }
  }
  onResendOtp() {
    if (this.signupForm.valid) {
      console.log('Signup:', this.signupForm.value);
      // Add your signup logic here
    }
  }
}
