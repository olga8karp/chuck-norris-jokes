import { Injectable, Signal, signal } from '@angular/core';

export interface User {
  firstName: string;
  phoneNumber: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = signal<User[]>([]);

  getUsers(): Signal<User[]> {
    return this.users;
  }

  addUser(firstName: string, phoneNumber: string): void {
    const newUser: User = {
      firstName,
      phoneNumber,
      id: this.generateId()
    };
    this.users.set([...this.users(), newUser]);
  }

  removeUser(id: string): void {
    this.users.set(this.users().filter(user => user.id !== id));
  }

  private generateId(): string {
    return Date.now().toString() + Math.floor(Math.random() * 1000);
  }
}
