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
    expect(component.isRowHighlighted(11)).toBeFalse();
    expect(component.isRowHighlighted(12)).toBeFalse();
    expect(component.isRowHighlighted(13)).toBeTrue();
    expect(component.isRowHighlighted(30)).toBeFalse();
    expect(component.isRowHighlighted(34)).toBeTrue();
    expect(component.isRowHighlighted(35)).toBeFalse();
    expect(component.isRowHighlighted(36)).toBeFalse();
    expect(component.isRowHighlighted(55)).toBeTrue();
  });
});
