import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = 'http://localhost:5002/api/activities';

  constructor(private http: HttpClient) { }

  createActivity(activity: Activity): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, activity);
  }
}
