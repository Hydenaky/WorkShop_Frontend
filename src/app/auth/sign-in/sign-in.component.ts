import { Component } from '@angular/core';
import { resources } from '../../../resources/resources';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../../data/schemes/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [resources],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      username: ['AAAA'],
      password: ['AAAA']
    })
  }

  async signIn(): Promise<void> {
    const newUser = new User(this.form.value.username, this.form.value.password);
    await this.authService.signIn(newUser);
    this.router.navigate(['home']);
  }

  navigate(): void {
    this.router.navigate(['auth/sign_up']);
  }
}
