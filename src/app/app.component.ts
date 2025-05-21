import { Component } from '@angular/core';
import { UserContactFormComponent } from './user-contact-form/user-contact-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
