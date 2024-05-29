import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tripform } from '../interfaces/tripform';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripformService {
  private apiUrl = 'http://localhost:5002/api/tripforms';

  constructor(private http: HttpClient) { }

  createTripForm(tripForm: Tripform): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, tripForm);
  }

}
