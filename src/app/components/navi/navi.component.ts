import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  components: string[] = ['Araclar', 'Markalar', 'Renkler'];
  routes: string[] = ['cars', 'brands', 'colors'];
  pages = new Map();

  admin_components: string[] = ['Kullanicilar', 'Musteriler', 'Kiralamalar'];
  admin_routes: string[] = ['users', 'customers', 'rentals'];

  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  constructor() {}

  ngOnInit(): void {}
}
