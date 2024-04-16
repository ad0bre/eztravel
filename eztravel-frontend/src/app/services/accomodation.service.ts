import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accomodation } from '../interfaces/accomodation';
import { Observable } from 'rxjs';
import { GetAccomodation } from '../interfaces/get-accomodation';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {

  private apiUrl = 'http://localhost:5002/api/accomodations';

  constructor(private http: HttpClient) { }

  createAccomodation(accomodation: Accomodation): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, accomodation);
  }

  getAccomodations(): Observable<GetAccomodation[]>{
    return this.http.get<GetAccomodation[]>(`${this.apiUrl}`);
  }
}
