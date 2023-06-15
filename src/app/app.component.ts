import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotstar';

  menuShow: boolean = false;

  menuData: any[] = [
    {
      name: 'My Space',
      icon: 'account_circle',
      route: ''
    },
    {
      name: 'Search',
      icon: 'search',
      route: ''
    },
    {
      name: 'Home',
      icon: 'home',
      route: ''
    },
    {
      name: 'TV',
      icon: 'tv_gen',
      route: ''
    },
    {
      name: 'Movies',
      icon: 'movie',
      route: ''
    },
    {
      name: 'Sports',
      icon: 'sports_baseball',
      route: ''
    }
  ];

}