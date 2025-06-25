import { Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { EventsComponent } from './home/events/events.component';
import { AttendaeesComponent } from './home/attendaees/attendaees.component';
import { ConfigComponent } from './auth/config/config.component';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'sign_in',
                component: SignInComponent
            },
            {
                path: 'sign_up',
                component: SignUpComponent
            },
            {
                path: 'config',
                component: ConfigComponent
            },
            {
                path: '**',
                redirectTo: 'sign_in'
            }
        ]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'events',
                outlet: 'first',
                component: EventsComponent
            },
            {
                path: 'attendees',
                outlet: 'second',
                component: AttendaeesComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
