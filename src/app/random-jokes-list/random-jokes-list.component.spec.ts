import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomJokesListComponent } from './random-jokes-list.component';
import { UserService } from '../services/user.service';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RandomJokesListComponent', () => {
  let component: RandomJokesListComponent;
  let fixture: ComponentFixture<RandomJokesListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'removeUser']);
    userServiceSpy.getUsers.and.returnValue(signal([]));

    await TestBed.configureTestingModule({
      imports: [
        RandomJokesListComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RandomJokesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeUser when removeRow is called', () => {
    const userId = '123';
    component.removeRow(userId);
    expect(userServiceSpy.removeUser).toHaveBeenCalledWith(userId);
  });

  it('should correctly identify Fibonacci numbers', () => {
    const componentAny = component as any;

    expect(componentAny.isFibonacciNumber(0)).toBeTrue();
    expect(componentAny.isFibonacciNumber(1)).toBeTrue();
    expect(componentAny.isFibonacciNumber(2)).toBeTrue();
    expect(componentAny.isFibonacciNumber(3)).toBeTrue();
    expect(componentAny.isFibonacciNumber(4)).toBeFalse();
    expect(componentAny.isFibonacciNumber(5)).toBeTrue();
    expect(componentAny.isFibonacciNumber(6)).toBeFalse();
    expect(componentAny.isFibonacciNumber(7)).toBeFalse();
    expect(componentAny.isFibonacciNumber(8)).toBeTrue();
    expect(componentAny.isFibonacciNumber(9)).toBeFalse();
    expect(componentAny.isFibonacciNumber(10)).toBeFalse();
    expect(componentAny.isFibonacciNumber(11)).toBeFalse();
    expect(componentAny.isFibonacciNumber(12)).toBeFalse();
    expect(componentAny.isFibonacciNumber(13)).toBeTrue();
  });

  it('should highlight rows at Fibonacci positions', () => {
    expect(component.isRowHighlighted(0)).toBeTrue();
    expect(component.isRowHighlighted(1)).toBeTrue();
    expect(component.isRowHighlighted(2)).toBeTrue();
    expect(component.isRowHighlighted(3)).toBeTrue();
    expect(component.isRowHighlighted(4)).toBeFalse();
    expect(component.isRowHighlighted(5)).toBeTrue();
    expect(component.isRowHighlighted(6)).toBeFalse();
    expect(component.isRowHighlighted(7)).toBeFalse();
    expect(component.isRowHighlighted(8)).toBeTrue();
    expect(component.isRowHighlighted(9)).toBeFalse();
    expect(component.isRowHighlighted(10)).toBeFalse();
  });
});
