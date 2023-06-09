import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  selectedMovie: any;
  topMovies: any[] = [];
  popularShows: any[] = [];
  upcommingMovie: any[] = [];

  currentPosition: number = 0;
  navPosition: number = 0;
  showPosition: number = 0;
  moviePosition: number = 0;
  isTopRatedHover: boolean = false;
  isPopularShowHover: boolean = false;
  isUpcomingMovieHover: boolean = false;
  hoveredImageIndex: number = 0;
  hoveredImageData: any;
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.fetchMovies();
    this.topRatedMovies();
    this.popularTvShows();
    this.trendingPersons();
  }

  fetchMovies() {
    this.movieService.getMovies().subscribe(
      response => {
        this.movies = response.results,
          this.selectedMovie = this.movies[0]
        // console.log(this.movies);
      },
      // response => console.log(response),
      error => console.error(error)
    );
  }

  topRatedMovies() {
    this.movieService.getTopRatedMovies().subscribe(
      response => {
        this.topMovies = response.results
        // console.log(this.topMovies);
      },
      error => console.error(error)
    );
  }

  popularTvShows() {
    this.movieService.getPopularTVShows().subscribe(
      response => {
        this.popularShows = response.results
      },
      error => console.error(error)
    );
  }

  trendingPersons() {
    this.movieService.getTrendingPersons().subscribe(
      response => {
        this.upcommingMovie = response.results
      },
      error => console.error(error)
    );
  }

  forward() {
    this.currentPosition += 1;
  }

  backward() {
    this.currentPosition -= 1;
    if (this.currentPosition < 0) {
      this.currentPosition = 0;
    }
  }

  handleSelectedMovie(movie: any) {
    this.selectedMovie = movie
  }

  navigationForward() {
    this.navPosition += 1;
  }
  navigationBack() {
    this.navPosition -= 1;
    if (this.navPosition < 0) {
      this.navPosition = 0;
    }
  }

  tvForward() {
    this.showPosition += 1;
  }
  tvBack() {
    this.showPosition -= 1;
    if (this.showPosition < 0) {
      this.showPosition = 0;
    }
  }

  movieForward() {
    this.moviePosition += 1;
  }

  movieBack() {
    this.moviePosition -= 1;
    if (this.moviePosition < 0) {
      this.moviePosition = 0;
    }
  }

  onTopRatedImageHover(index: number, hoveredData: any): void {
    this.hoveredImageIndex = index;
    this.hoveredImageData = hoveredData;
    this.isTopRatedHover = true;
  }

  onPopularShowImageHover(index: number, hoveredData: any): void {
    this.hoveredImageIndex = index;
    this.hoveredImageData = hoveredData;
    this.isPopularShowHover = true;
  }

  onUpcomingMovieImageHover(index: number, hoveredData: any): void {
    this.hoveredImageIndex = index;
    this.hoveredImageData = hoveredData;
    this.isUpcomingMovieHover = true;
  }
}
