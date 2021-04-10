import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserClaims } from '../models/userClaims';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private helper: JwtHelperService) {}

  getLoggedUser(): UserClaims {
    let loggedUser: UserClaims;
    if (this.helper.tokenGetter()) {
      loggedUser = {} as UserClaims;
      const decodedToken = this.helper.decodeToken();
      loggedUser.role =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      loggedUser.name =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ];
      loggedUser.nameidentifier = +decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
      loggedUser.email = decodedToken['email'];
    }
    return loggedUser;
  }

  isExpired(): Boolean {
    if (this.helper.tokenGetter()) {
      return this.helper.isTokenExpired();
    } else {
      return true;
    }
  }
}
