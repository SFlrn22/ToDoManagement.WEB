import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieHelperService {
  constructor(private cookieService: CookieService) {}

  getCookies(name: string): string {
    return this.cookieService.get(name);
  }

  setCookies(name: string, value: string): void {
    this.cookieService.set(name, value);
  }

  removeCookies(name: string): void {
    this.cookieService.delete(name);
  }

  removeAllCookies(): void {
    this.cookieService.deleteAll();
  }
}
