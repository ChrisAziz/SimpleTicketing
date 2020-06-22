import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketAddEditComponent } from './ticket-add-edit/ticket-add-edit.component';

const routes: Routes = [
  { path: '', component: TicketsComponent, pathMatch: 'full' },
  { path: 'ticket/:id', component: TicketComponent },
  { path: 'add', component: TicketAddEditComponent },
  { path: 'ticket/edit/:id', component: TicketAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
