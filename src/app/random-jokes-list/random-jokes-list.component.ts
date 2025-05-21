import {Component, inject, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-random-jokes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './random-jokes-list.component.html',
  styleUrl: './random-jokes-list.component.scss'
})
export class RandomJokesListComponent {
  private userService = inject(UserService);
  users: Signal<User[]> = this.userService.getUsers();

  removeUser(id: string): void {
    this.userService.removeUser(id);
  }
}
