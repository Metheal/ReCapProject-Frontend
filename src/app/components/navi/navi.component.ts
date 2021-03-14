import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor() {}
  components: string[] = ['Araclar', 'Markalar', 'Renkler'];
  routes: string[] = ['cars', 'brands', 'colors'];
  pages = new Map();

  admin_components: string[] = ['Kullanicilar', 'Musteriler', 'Kiralamalar'];
  admin_routes: string[] = ['users', 'customers', 'rentals'];

  ngOnInit(): void {}
}
