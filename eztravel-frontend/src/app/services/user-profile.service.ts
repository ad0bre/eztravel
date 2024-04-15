import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:5002/api/user-profiles';

  constructor(private http: HttpClient) { }

  getUserProfiles(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>(`${this.apiUrl}`);
  }
}
