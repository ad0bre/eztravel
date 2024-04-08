import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transport } from '../interfaces/transport';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private apiUrl = 'http://localhost:5002/api/transport';

  constructor(private http: HttpClient) { }

  createTransport(transport: Transport): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, transport);
  }
}
