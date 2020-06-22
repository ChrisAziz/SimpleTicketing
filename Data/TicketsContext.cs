using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestApp.Models;

namespace TestApp.Data
{
    public class TicketsContext : DbContext
    {
        public TicketsContext (DbContextOptions<TicketsContext> options)
            : base(options)
        {
        }

        public DbSet<TestApp.Models.Ticket> Tickets { get; set; }
    }
}
