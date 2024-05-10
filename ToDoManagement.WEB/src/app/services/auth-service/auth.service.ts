import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthRequest } from '../../Models/AuthRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: AuthRequest): any {
    return this.http.post<any>(this.apiUrl + '/Login', credentials);
  }
  register(credentials: AuthRequest): any {
    return this.http.post<any>(this.apiUrl + '/Register', credentials);
  }
}
