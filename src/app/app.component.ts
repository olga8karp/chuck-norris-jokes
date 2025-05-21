import { Component } from '@angular/core';
import { UserContactFormComponent } from './user-contact-form/user-contact-form.component';
import { RandomJokesListComponent } from './random-jokes-list/random-jokes-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserContactFormComponent, RandomJokesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
