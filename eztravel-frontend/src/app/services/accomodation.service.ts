import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accomodation } from '../interfaces/accomodation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {

  private apiUrl = 'http://localhost:5002/api/accomodations';

  constructor(private http: HttpClient) { }

  createTransport(accomodation: Accomodation): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, accomodation);
  }
}
