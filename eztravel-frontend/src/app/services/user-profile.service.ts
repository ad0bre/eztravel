import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile';
import { GetUserProfile } from '../interfaces/get-user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:5002/api/user-profiles';

  constructor(private http: HttpClient) { }

  getUserProfiles(): Observable<GetUserProfile[]>{
    return this.http.get<GetUserProfile[]>(`${this.apiUrl}`);
  }

  createUserProfile(userProfile: UserProfile): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, userProfile);
  }
}
