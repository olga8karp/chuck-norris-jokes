import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { JokeService } from './joke.service';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let jokeServiceSpy: jasmine.SpyObj<JokeService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('JokeService', ['fetchRandomJoke']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: JokeService, useValue: spy }
      ]
    });

    service = TestBed.inject(UserService);
    jokeServiceSpy = TestBed.inject(JokeService) as jasmine.SpyObj<JokeService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty array initially', () => {
    expect(service.getUsers()()).toEqual([]);
  });

  it('should add a user with a joke', () => {
    // Arrange
    const mockJoke = 'Chuck Norris can divide by zero.';
    jokeServiceSpy.fetchRandomJoke.and.returnValue(of(mockJoke));

    // Act
    service.addUser('John', '1234567890');

    // Assert
    const users = service.getUsers()();
    expect(users.length).toBe(1);
    expect(users[0].firstName).toBe('John');
    expect(users[0].phoneNumber).toBe('1234567890');
    expect(users[0].joke).toBe(mockJoke);
    expect(jokeServiceSpy.fetchRandomJoke).toHaveBeenCalledTimes(1);
  });

  it('should remove a user by id', () => {
    // Arrange
    const mockJoke = 'Chuck Norris can divide by zero.';
    jokeServiceSpy.fetchRandomJoke.and.returnValue(of(mockJoke));

    // Add a user
    service.addUser('John', '1234567890');
    const users = service.getUsers()();
    const userId = users[0].id;

    // Act
    service.removeUser(userId);

    // Assert
    expect(service.getUsers()().length).toBe(0);
  });

});
