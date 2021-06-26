import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AlertService, TokenService } from '@core/services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private alertService: AlertService, private tokenService: TokenService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
	// server takes care of session
	// return true;
	if (this.tokenService.checkStoredAccessToken()) {
	  // logged in so return true
	  return true;
	} else {
	  // not logged in so redirect to login page with the return url
	  this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
	  return false;
	}
  }
}
