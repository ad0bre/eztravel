import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tripform } from '../interfaces/tripform';
import { Observable } from 'rxjs';
import { GetTrip } from '../interfaces/get-trip';

@Injectable({
  providedIn: 'root'
})
export class TripformService {
  private apiUrl = 'http://localhost:5002/api/trips';

  constructor(private http: HttpClient) { }

  createTripForm(tripForm: Tripform): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, tripForm);
  }

  getTripsByUser(userId: string | null): Observable<GetTrip[]> {
    if (!userId) {
      throw new Error("User ID is null");
    }
    return this.http.get<GetTrip[]>(`${this.apiUrl}/${userId}`);
  }

  getTripByID(tripID: string | null): Observable<GetTrip>{
    return this.http.get<GetTrip>(`${this.apiUrl}/id/${tripID}`);
  }

}
