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
      };

      this.users.set([...this.users(), newUser]);
    });
  }

  removeUser(id: string): void {
    this.users.set(this.users().filter(user => user.id !== id));
  }

  private generateId(): string {
    return Date.now().toString() + Math.floor(Math.random() * 1000);
  }
}
