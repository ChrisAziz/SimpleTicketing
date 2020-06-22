import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Tickets/';
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.myAppUrl + this.myApiUrl + ticketId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  saveTicket(ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.myAppUrl + this.myApiUrl, JSON.stringify(ticket), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

updateTicket(ticketId: number, ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.myAppUrl + this.myApiUrl + ticketId, JSON.stringify(ticket), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

deleteTicket(ticketId: number): Observable<Ticket> {
    return this.http.delete<Ticket>(this.myAppUrl + this.myApiUrl + ticketId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
