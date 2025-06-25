import { Component } from '@angular/core';
import { resources } from '../../../resources/resources';
import { User } from '../../../data/schemes/user.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [resources],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  form: FormGroup;
  validator: boolean;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      username: [''],
      password: [''],
      repeat_password: ['']
    })
  }

  signUp(): void | boolean {
    const newUser = new User(this.form.value.username, this.form.value.password);

    if (this.form.value.password === this.form.value.repeat_password)
      return this.authService.signUp(newUser)
    else return this.validator = true;

  }

  navigate() {
    this.router.navigate(['auth/sing_in']);
  }
}
