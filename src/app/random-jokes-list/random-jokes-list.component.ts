import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

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

  removeRow(id: string): void {
    this.userService.removeUser(id);
  }

  isRowHighlighted(index: number): boolean {
    return this.isFibonacciNumber(index)
  }

  private isFibonacciNumber(number: number): boolean {
    if (number === 0 || number === 1) {
      return true;
    }

    const isPerfectSquare = (x: number) => {
      const s = Math.sqrt(x);
      return s === Math.floor(s);
    };

    return isPerfectSquare(5 * number * number + 4) || isPerfectSquare(5 * number * number - 4);
  }

}
