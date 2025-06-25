import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { resources } from '../resources/resources';
import { InputTextModule } from 'primeng/inputtext'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, resources, InputTextModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WorkShop_Frontend';
  valor: boolean = false;
  toggleDarkMode(): boolean {
    const element = document.querySelector('html');
    element.classList.toggle('my-app-dark');
    return true
  }
}
