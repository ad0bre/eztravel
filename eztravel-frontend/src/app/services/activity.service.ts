import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity';
import { Observable } from 'rxjs';
import { GetActivity } from '../interfaces/get-activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = 'http://localhost:5002/api/activities';

  constructor(private http: HttpClient) { }

  createActivity(activity: Activity): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, activity);
  }

  getActivities(): Observable<GetActivity[]>{
    return this.http.get<GetActivity[]>(`${this.apiUrl}`);
  }

  deleteActivity(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
