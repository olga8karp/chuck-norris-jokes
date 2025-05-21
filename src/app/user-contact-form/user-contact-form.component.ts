import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './user-contact-form.component.html',
  styleUrl: './user-contact-form.component.scss'
})
export class UserContactFormComponent {
  formSubmitted = false;
  formData: { firstName: string; phoneNumber: string } | null = null;
  userService = inject(UserService);

  // Form group with validators
  contactForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ])
  });

  // Getter methods for easy access in template
  public get firstName() {
    return this.contactForm.get('firstName');
  }

  public get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.formData = {
        firstName: this.firstName?.value || '',
        phoneNumber: this.phoneNumber?.value || ''
      };
      this.formSubmitted = true;
      this.userService.addUser(this.formData.firstName, this.formData.phoneNumber);
    } else {
      // Mark all fields as touched to trigger validation messages
      this.contactForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.contactForm.reset();
    this.formSubmitted = false;
    this.formData = null;
  }
}
