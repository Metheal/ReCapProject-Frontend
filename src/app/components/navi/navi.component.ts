import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSignInAlt,
  faSignOutAlt,
  faUserAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserClaims } from 'src/app/models/userClaims';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {

  admin_components: string[] = ['Kullanicilar', 'Musteriler', 'Kiralamalar', 'Yeni Arac Ekle'];
  admin_routes: string[] = ['users', 'customers', 'rentals', 'carAdd'];

  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUserPlus = faUserPlus;
  faUserAlt = faUserAlt;

  user: UserClaims;
  isExpired: boolean;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private jwt: JwtService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  getUser() {
    this.user = this.jwt.getLoggedUser();
  }

  logout(): void {
    this.localStorage.removeItem('token');
    this.reload();
  }

  reload() {
    this.router
      .navigateByUrl('/', {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  isLoggedIn(): boolean {
    this.getUser();
    return this.auth.isAuthenticated();
  }
}
