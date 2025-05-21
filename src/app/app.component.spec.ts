import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { JokeService } from './services/joke.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('AppComponent', () => {
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let jokeServiceSpy: jasmine.SpyObj<JokeService>;

  beforeEach(async () => {
    // Create spies for the services
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'addUser', 'removeUser']);
    jokeServiceSpy = jasmine.createSpyObj('JokeService', ['fetchRandomJoke']);

    // Setup return values for the spy methods
    userServiceSpy.getUsers.and.returnValue(signal([]));
    jokeServiceSpy.fetchRandomJoke.and.returnValue(of('Chuck Norris joke'));

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: JokeService, useValue: jokeServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Chuck Norris jokes');
  });

  it('should contain UserContactFormComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-user-contact-form')).toBeTruthy();
  });

  it('should contain RandomJokesListComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-random-jokes-list')).toBeTruthy();
  });
});
