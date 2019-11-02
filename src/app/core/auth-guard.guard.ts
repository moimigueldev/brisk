import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { take, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private fas: FirebaseAuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.fas.authState.pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this.toastrService.warning('Plese Login First');
          this.router.navigate(['login']);
        }
      })

    );
  }

}
