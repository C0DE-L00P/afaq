import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

export const CanActivateDashboard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.userData) return true;
  let token = localStorage.getItem('token');
  if (!!token && token != '') {

    //Get userData and access
    let { nameid } = interpretToken(token);

    let usersService = inject(UsersService);
    usersService.getUser(nameid).subscribe(
      (res) => {
        authService.userData = res;
      },
      (err) => console.error('ERR IN GUARD', err)
    );

    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const CanActivateLogin = () => {
  const router = inject(Router);

    //   TOOD this for debugging perpuse remove it when done
    return true;

  if (!CanActivateDashboard) {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};

function interpretToken(token: string) {
  const parts = token.split('.');
  const payload = parts[1];

  const decodedPayload = atob(payload);
  const decodedPayloadObj = JSON.parse(decodedPayload);

  console.log(decodedPayloadObj);
  return decodedPayloadObj;
}
