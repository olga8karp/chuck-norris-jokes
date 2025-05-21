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

  it('should highlight users at Fibonacci positions', () => {
    // Arrange
    const mockJoke = 'Chuck Norris can divide by zero.';
    jokeServiceSpy.fetchRandomJoke.and.returnValue(of(mockJoke));

    // Add users
    service.addUser('User0', '0000000000');
    service.addUser('User1', '1111111111');
    service.addUser('User2', '2222222222');
    service.addUser('User3', '3333333333');
    service.addUser('User4', '4444444444');
    service.addUser('User5', '5555555555');
    service.addUser('User6', '6666666666');
    service.addUser('User7', '7777777777');
    service.addUser('User8', '8888888888');
    service.addUser('User9', '9999999999');
    service.addUser('User10', '1010101010');

    // Assert
    const users = service.getUsers()();
    expect(users[0].highlighted).toBeTrue();
    expect(users[1].highlighted).toBeTrue();
    expect(users[2].highlighted).toBeTrue();
    expect(users[3].highlighted).toBeTrue();
    expect(users[4].highlighted).toBeFalse();
    expect(users[5].highlighted).toBeTrue();
    expect(users[6].highlighted).toBeFalse();
    expect(users[7].highlighted).toBeFalse();
    expect(users[8].highlighted).toBeTrue();
    expect(users[9].highlighted).toBeFalse();
    expect(users[10].highlighted).toBeFalse();
  });

  it('should correctly identify Fibonacci numbers', () => {
    const service: any = TestBed.inject(UserService);

    expect(service.isFibonacciNumber(0)).toBeTrue();
    expect(service.isFibonacciNumber(1)).toBeTrue();
    expect(service.isFibonacciNumber(2)).toBeTrue();
    expect(service.isFibonacciNumber(3)).toBeTrue();
    expect(service.isFibonacciNumber(4)).toBeFalse();
    expect(service.isFibonacciNumber(5)).toBeTrue();
    expect(service.isFibonacciNumber(6)).toBeFalse();
    expect(service.isFibonacciNumber(7)).toBeFalse();
    expect(service.isFibonacciNumber(8)).toBeTrue();
    expect(service.isFibonacciNumber(9)).toBeFalse();
    expect(service.isFibonacciNumber(10)).toBeFalse();
    expect(service.isFibonacciNumber(11)).toBeFalse();
    expect(service.isFibonacciNumber(12)).toBeFalse();
    expect(service.isFibonacciNumber(13)).toBeTrue();
  });
});
