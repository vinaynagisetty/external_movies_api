import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MovieListComponent } from './app/movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent],
  template: `
    <div class="container">
      <h1 class="text-center my-4">Movie List Application</h1>
      <app-movie-list></app-movie-list>
    </div>
  `,
})
export class App {
  name = 'Movie List';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});