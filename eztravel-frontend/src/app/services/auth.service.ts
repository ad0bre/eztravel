import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { User_Login } from '../interfaces/user-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5002/api/auth';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: User_Login): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }
}
