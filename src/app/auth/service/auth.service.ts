import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  isLoggedIn(): boolean {
    return !!localStorage.getItem('acc_T');
  }

  logout() {
    localStorage.removeItem('acc_T');
    this.router.navigate(['auth'])
  }
}
