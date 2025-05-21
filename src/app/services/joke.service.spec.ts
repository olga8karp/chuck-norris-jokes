import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JokeService, ChuckNorrisJoke } from './joke.service';

describe('JokeService', () => {
  let service: JokeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JokeService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(JokeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a random joke', () => {
    // Arrange
    const mockJoke: ChuckNorrisJoke = {
      id: '123',
      value: 'Chuck Norris can divide by zero.',
      url: 'https://api.chucknorris.io/jokes/123',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      created_at: '2020-01-05 13:42:19.324003',
      updated_at: '2020-01-05 13:42:19.324003',
      categories: []
    };

    let actualJoke: string | undefined;

    // Act
    service.fetchRandomJoke().subscribe(joke => {
      actualJoke = joke;
    });

    // Assert - Check that the correct URL was called
    const req = httpMock.expectOne('https://api.chucknorris.io/jokes/random');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockJoke);

    // Check that the joke was correctly extracted and returned
    expect(actualJoke).toBe(mockJoke.value);

    // Check that the joke signal was updated
    expect(service.joke()).toBe(mockJoke.value);
  });

  it('should handle errors when fetching a joke', () => {
    // Arrange
    const errorMessage = 'Network error';
    const fallbackJoke = 'Could not fetch a Chuck Norris joke. He is probably too busy being awesome.';

    let actualJoke: string | undefined;

    // Act
    service.fetchRandomJoke().subscribe(joke => {
      actualJoke = joke;
    });

    // Assert - Check that the correct URL was called
    const req = httpMock.expectOne('https://api.chucknorris.io/jokes/random');
    expect(req.request.method).toBe('GET');

    // Respond with an error
    req.error(new ErrorEvent('Network error', {
      message: errorMessage,
    }));

    // Check that the fallback joke was returned
    expect(actualJoke).toBe(fallbackJoke);

    // Check that the joke signal was updated with the fallback joke
    expect(service.joke()).toBe(fallbackJoke);
  });

  it('should update the joke signal when fetching a joke', () => {
    // Arrange
    const mockJoke: ChuckNorrisJoke = {
      id: '123',
      value: 'Chuck Norris can divide by zero.',
      url: 'https://api.chucknorris.io/jokes/123',
      icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
      created_at: '2020-01-05 13:42:19.324003',
      updated_at: '2020-01-05 13:42:19.324003',
      categories: []
    };

    // Act
    service.fetchRandomJoke().subscribe();

    // Assert - Check that the correct URL was called
    const req = httpMock.expectOne('https://api.chucknorris.io/jokes/random');

    // Respond with mock data
    req.flush(mockJoke);

    // Check that the joke signal was updated
    expect(service.joke()).toBe(mockJoke.value);
  });
});
