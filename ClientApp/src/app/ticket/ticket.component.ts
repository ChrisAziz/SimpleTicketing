import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticket$: Observable<Ticket>;
  ticketId: number;

  constructor(private ticketService: TicketService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.ticketId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadTicket();
  }

  loadTicket(){
    this.ticket$ = this.ticketService.getTicket(this.ticketId);
  }
}
