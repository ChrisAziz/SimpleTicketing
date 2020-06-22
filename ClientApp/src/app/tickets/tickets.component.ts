import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  tickets$: Observable<Ticket[]>;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets(){
    this.tickets$ = this.ticketService.getTickets();
  }

  deleteTicket(ticketId){
    const ans = confirm ('Do you want to delete ticket number ' + ticketId + '?');
    if (ans) {
      this.ticketService.deleteTicket(ticketId).subscribe((data) => {
        this.loadTickets();
      });
    }
  }

}
