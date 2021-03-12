import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor() {}
  components: string[] = [
    'Araclar',
    'Markalar',
    'Renkler',
    'Musteriler',
    'Kiralamalar',
  ];
  routes: string[] = ['cars', 'brands', 'colors', 'customers', 'rentals'];
  pages = new Map();

  ngOnInit(): void {
    this.makeMap(this.components, this.routes);
    this.fun();
  }

  makeMap(components: string[], routes: string[]): void {
    for (let i = 0; i < routes.length; i++) {
      this.pages.set(components, routes);
    }
  }
  fun() {
    for (let i = 0; i < this.components.length; i++) {
      console.log(i);
    }
    console.log(this.pages.get(this.components)[0])
  }

}
