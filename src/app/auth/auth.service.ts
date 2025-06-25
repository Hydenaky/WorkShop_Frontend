import { Injectable } from '@angular/core';
import { User } from '../../data/schemes/user.class';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  validator: boolean = false;

  username: string;
  constructor(private router: Router, private httpClient: HttpClient) { }

  async signIn(user: User): Promise<void> {
    try {
      const result = await firstValueFrom(
        this.httpClient.post<string>('http://localhost:3000/user/signIn', user.toJson())
      );
      if (result !== null)
        this.validator = true
      this.username = user.username; 
    } catch (error) {
      console.error('Error en signIn:', error);
      this.validator = false;
    }
  }

  signUp(user: User) {
    this.httpClient.post<User>(`http://localhost:3000/user`, user.toJson()).subscribe({
      next: res => {
        console.log('Ok');
        this.username = user.username;
        this.signIn(user)
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          console.log('Fail');

        }
      }
    });
  }


  updateUser(user: User) {
    console.log('usrname',this.username);
    
    this.httpClient.put<User>(`http://localhost:3000/user/${this.username}`, user.toJson()).subscribe({
      next: res => {
        console.log('Ok');
        this.username = user.username;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          console.log('Fail');
        }
      }
    });
  }
  deleteUser() { }
}
