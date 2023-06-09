import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';

  private headers = new HttpHeaders({
    'accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDliZTA3MGRlZjI0MmQ4ZDdmY2JlMmMzNzI1MTM3OCIsInN1YiI6IjY0ODE3MDg4ZTI3MjYwMDEwNzIwYTY2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5fLLgRd2AtsTZlFTkHVtCqgq2VI-RgPmqy3w6_hUjBE'
  });

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    const url = `${this.apiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    return this.http.get(url, { headers: this.headers });
  }

  getTopRatedMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/top_rated?language=en-US&page=1`;
    return this.http.get(url, { headers: this.headers });
  }


  getPopularTVShows(): Observable<any> {
    const url = `${this.apiUrl}/tv/popular?language=en-US&page=1`;
    return this.http.get(url, { headers: this.headers });
  }

  getTrendingPersons(): Observable<any> {
    const url = `${this.apiUrl}/movie/upcoming?language=en-US&page=1`;
    return this.http.get(url, { headers: this.headers });
  }
}
