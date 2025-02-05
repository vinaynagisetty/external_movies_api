import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../movie.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="container mt-4">
      <div class="search-box">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Search movies..." 
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearch($event)">
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" *ngFor="let movie of movies">
          <div class="card h-100 movie-card">
            <img 
              [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path" 
              class="card-img-top" 
              [alt]="movie.title"
              *ngIf="movie.poster_path">
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <p class="card-text">{{ movie.overview | slice:0:150 }}...</p>
              <p class="card-text">
                <small class="text-muted">Release date: {{ movie.release_date }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label="Movie pagination" class="mt-4">
        <ul class="pagination">
          <li class="page-item" [class.disabled]="currentPage === 1">
            <a class="page-link" (click)="changePage(currentPage - 1)" role="button">Previous</a>
          </li>
          <li class="page-item">
            <span class="page-link">Page {{ currentPage }} of {{ totalPages }}</span>
          </li>
          <li class="page-item" [class.disabled]="currentPage === totalPages">
            <a class="page-link" (click)="changePage(currentPage + 1)" role="button">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  `
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  totalPages = 1;
  searchQuery = '';
  searchTimeout: any;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    if (this.searchQuery) {
      this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe(response => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
      });
    } else {
      this.movieService.getMovies(this.currentPage).subscribe(response => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
      });
    }
  }

  onSearch(query: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchQuery = query;
      this.currentPage = 1;
      this.loadMovies();
    }, 500);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMovies();
    }
  }
}