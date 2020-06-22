import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-ticket-add-edit',
  templateUrl: './ticket-add-edit.component.html',
  styleUrls: ['./ticket-add-edit.component.scss']
})
export class TicketAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  ticketId: number;
  errorMessage: any;
  existingTicket: Ticket;

  constructor(private ticketService: TicketService, private formBuilder: FormBuilder,
              private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.ticketId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        ticketId: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    );
  }

  ngOnInit() {

    if (this.ticketId > 0) {
      this.actionType = 'Edit';
      this.ticketService.getTicket(this.ticketId)
        .subscribe(data => (
          this.existingTicket = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formBody].setValue(data.body)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let ticket: Ticket = {
        solved: false,
        dt: new Date(),
        requester: 'Random Employee',
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };

      this.ticketService.saveTicket(ticket)
        .subscribe((data) => {
          this.router.navigate(['/ticket', data.ticketId]);
          // Ticket  added notification
        });
    }

    if (this.actionType === 'Edit') {
      let ticket: Ticket = {
        ticketId: this.existingTicket.ticketId,
        dt: this.existingTicket.dt,
        requester: this.existingTicket.requester,
        solved: this.existingTicket.solved,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };
      this.ticketService.updateTicket(ticket.ticketId, ticket)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
          // Ticket  updated notification
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }
}
