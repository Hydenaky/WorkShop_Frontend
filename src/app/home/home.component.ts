import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { resources } from '../../resources/resources';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, resources],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;
  visible2: boolean = false;

  constructor(private router: Router) { }
  ngOnInit() {
    this.items = [
      { label: 'Events', icon: 'pi pi-plus', command: () => this.Events() },
      { label: 'Attendees', icon: 'pi pi-search', command: () => this.Attendees() },
      { label: 'Config', icon: 'pi pi-cog', command: () => this.Config() }
    ];
    this.Both()
  }

  showMenu() {
    this.visible2 = !this.visible2;
  }

  Events(): void {
    this.router.navigate([
      '/home',
      { outlets: { first: ['events'] } }
    ]);
  }

  Attendees(): void {
    this.router.navigate([
      '/home',
      { outlets: { second: ['attendees'] } }
    ]);
  }

  Both(): void {
    this.router.navigate(['/home', {
      outlets: {
        first: ['events'],
        second: ['attendees']
      }
    }]);
  }

  Config(): void {
    this.router.navigate(['/auth/config']);
  }

}