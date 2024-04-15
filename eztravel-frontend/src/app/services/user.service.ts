import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGet } from '../interfaces/user-get';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5002/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserGet[]>{
    return this.http.get<UserGet[]>(`${this.apiUrl}`);
  }
}
