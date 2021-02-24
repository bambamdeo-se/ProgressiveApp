using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Model
{
    public class Tenant
    {
        public int? TenantId { get; set; }
        public string TenantName { get; set; }
        public int TenantTypeId { get; set; }
       
        }
}
