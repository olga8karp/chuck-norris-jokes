import { inject, Injectable, Signal, signal } from '@angular/core';
import { JokeService } from './joke.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = signal<User[]>([]);
  private jokeService = inject(JokeService);

  getUsers(): Signal<User[]> {
    return this.users;
  }

  addUser(firstName: string, phoneNumber: string): void {
    const userId = this.generateId();

    this.jokeService.fetchRandomJoke().subscribe((joke: string) => {
      const newUser: User = {
        firstName,
        phoneNumber,
        id: userId,
        joke: joke,
        highlighted: this.isFibonacciNumber(this.users().length),
      };

      this.users.set([...this.users(), newUser]);
    });
  }

  removeUser(id: string): void {
    this.users.set(this.users().filter(user => user.id !== id));
  }

  private isFibonacciNumber(number: number): boolean {
    console.log(number);
    // Special cases for 0 and 1, which are Fibonacci numbers
    if (number === 0 || number === 1) {
      return true;
    }

    const isPerfectSquare = (x: number) => {
      const s = Math.sqrt(x);
      return s === Math.floor(s);
    };

    return isPerfectSquare(5 * number * number + 4) || isPerfectSquare(5 * number * number - 4);
  }

  private generateId(): string {
    return Date.now().toString() + Math.floor(Math.random() * 1000);
  }
}
