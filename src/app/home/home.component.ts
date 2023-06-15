import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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

  youtubeKey: string = '';
  hoveredVideoKey!: string;

  showIframe = false;
  hoverTimeout: string | number | any | undefined;

  constructor(private movieService: MovieService, private sanitizer: DomSanitizer) { }

  sanitizeYouTubeUrl(key: string): SafeResourceUrl {
    // console.log('key', key);

    const url = `https://www.youtube-nocookie.com/embed/${key}?autoplay=1&mute=1`;
    // console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

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
      },
      error => console.error(error)
    );
  }

  topRatedMovies() {
    this.movieService.getTopRatedMovies().subscribe(
      response => {
        this.topMovies = response.results;
        for (const movie of this.topMovies) {
          const movieId = movie.id;
          this.movieService.getMovieVideos(movieId).subscribe(result => {
            if (result && result.results && result.results.length > 0) {
              movie.youtubeKey = result.results[0].key;
              // console.log(this.youtubeKey);
            }
          })
        }
      },
      error => console.error(error)
    );
  }

  popularTvShows() {
    this.movieService.getPopularTVShows().subscribe(
      response => {
        this.popularShows = response.results;
        for (const movie of this.popularShows) {
          const movieId = movie.id;
          // console.log("Movie ID:", movieId);
        }
      },
      error => console.error(error)
    );
  }

  trendingPersons() {
    this.movieService.getTrendingPersons().subscribe(
      response => {
        this.upcommingMovie = response.results;
        for (const movie of this.upcommingMovie) {
          const movieId = movie.id;
          this.movieService.getMovieVideos(movieId).subscribe(result => {
            if (result && result.results && result.results.length > 0) {
              movie.youtubeKey = result.results[0].key;
              // console.log(this.youtubeKey);
            }
          });
        }
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
    this.hoveredVideoKey = hoveredData.youtubeKey;

    this.showIframe = false;
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => {
      this.showIframe = true;
    }, 1500);
  }

  onTopRatedImageLeave(): void {
    clearTimeout(this.hoverTimeout);
    this.isTopRatedHover = false;
    this.showIframe = false;
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
    this.hoveredVideoKey = hoveredData.youtubeKey;

    this.showIframe = false;
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => {
      this.showIframe = true;
    }, 1500);
  }
}