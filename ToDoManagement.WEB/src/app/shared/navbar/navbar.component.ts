import { Component, OnInit } from '@angular/core';
import { CookieHelperService } from '../../services/cookie-helper-service/cookie-helper.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private cookieService: CookieHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.CheckAuth();
  }

  public CheckAuth() {
    var username = this.cookieService.getCookies('username');
    this.isAuthenticated = true ? username != '' : false;
  }

  public Logout() {
    this.cookieService.removeAllCookies();
    this.router.navigateByUrl('home').then(() => {
      window.location.reload();
    });
  }
}
