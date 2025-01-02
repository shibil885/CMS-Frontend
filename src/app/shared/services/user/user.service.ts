import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _baseUrl = import.meta.env.NG_APP_BASE_URL;
  constructor(private _http: HttpClient) {}

  userLogin() {}
  userSignup() {}
}
