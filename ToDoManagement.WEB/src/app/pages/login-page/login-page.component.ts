import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CookieHelperService } from '../../services/cookie-helper-service/cookie-helper.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { SnackbarService } from '../../services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  hide: boolean = true;
  loginForm: FormGroup | any = null;

  constructor(
    private location: Location,
    private router: Router,
    private cookieHelper: CookieHelperService,
    private authService: AuthService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((data: any) => {
        if (data == true) {
          this.cookieHelper.setCookies(
            'username',
            this.loginForm.username.value
          );
          this.snackBarService.openSnackBar(
            'Logare realizata cu success, vei fi redirectat catre pagina de start',
            'Close',
            'success'
          );
          setTimeout(
            () =>
              this.router.navigateByUrl('home').then(() => {
                window.location.reload();
              }),
            1500
          );
        } else {
          this.snackBarService.openSnackBar(data, 'Close', 'error');
        }
      });
    }
  }

  clickBack() {
    this.location.back();
  }
}
