import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div>
          <label for="email">Email:</label>
          <input id="email" type="email" formControlName="email" />
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
            A valid email is required.
          </div>
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" type="password" formControlName="password" />
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            Password is required.
          </div>
        </div>
        <button type="submit" [disabled]="loginForm.invalid">Login</button>
        <div *ngIf="error" style="color: red;">
          {{ error }}
        </div>
      </form>
    </div>
  `
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.permissionService.setUserPermissions([response.user.accessLevel]);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error('Login error', error);
          this.error = 'Invalid email or password.';
        }
      });
    }
  }
  
}
