import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface ChuckNorrisJoke {
  id: string;
  value: string;
  url: string;
  icon_url: string;
  created_at: string;
  updated_at: string;
  categories: string[];
}

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  private apiUrl = 'https://api.chucknorris.io/jokes/random';
  private jokeSignal = signal<string>('');
  private http = inject(HttpClient);

  get joke() {
    return this.jokeSignal;
  }

  fetchRandomJoke(): Observable<string> {
    return this.http.get<ChuckNorrisJoke>(this.apiUrl).pipe(
      map(joke => joke.value),
      tap(joke => {
        this.jokeSignal.set(joke);
      }),
      catchError(error => {
        console.error('Error fetching joke:', error);
        const fallbackJoke = 'Could not fetch a Chuck Norris joke. He is probably too busy being awesome.';
        this.jokeSignal.set(fallbackJoke);
        return of(fallbackJoke);
      })
    );
  }
}
