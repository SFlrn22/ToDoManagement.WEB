import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CookieHelperService } from '../../services/cookie-helper-service/cookie-helper.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { SnackbarService } from '../../services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-register-page',
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
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  hide: boolean = true;
  registerForm: FormGroup | any = null;

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .subscribe((data: any) => {
          if (data.isSuccess != false) {
            this.snackBarService.openSnackBar(
              'Inregistrare realizata cu success',
              'Close',
              'success'
            );
            this.router.navigateByUrl('login');
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
