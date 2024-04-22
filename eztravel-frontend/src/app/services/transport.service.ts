import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transport } from '../interfaces/transport';
import { Observable } from 'rxjs';
import { GetTransport } from '../interfaces/get-transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private apiUrl = 'http://localhost:5002/api/transport';

  constructor(private http: HttpClient) { }

  createTransport(transport: Transport): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`, transport);
  }

  getTransports(): Observable<GetTransport[]>{
    return this.http.get<GetTransport[]>(`${this.apiUrl}`);
  }

  deleteTransport(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
