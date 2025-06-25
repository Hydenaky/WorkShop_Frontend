import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../data/schemes/user.class';
import { resources } from '../../../resources/resources';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [resources],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  form: FormGroup;
  constructor(private authService: AuthService, private formBuilder: FormBuilder){
    this.form = formBuilder.group({
      username: [],
      password: []
    })
  }

  update(){
    const uUser = new User(this.form.value.username, this.form.value.password)
    this.authService.updateUser(uUser)
  }
}
