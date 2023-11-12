import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  hide = true;
  loginForm!: FormGroup;
  error: any;
  user = sessionStorage.getItem('user');
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private titleService: Title,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.titleService.setTitle('Login');

    if (this.user) {
      this.router.navigateByUrl('/home');
    }
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.success = true;

    this.auth
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.success = false;
          this.router.navigateByUrl('/home');
          this.error = '';
        },
        error: (error) => {
          this.success = false;
          this.error = error;
        },
      });
  }

  get f() {
    return this.loginForm.controls;
  }
}
