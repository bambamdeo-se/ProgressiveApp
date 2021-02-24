using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Model
{
    public class ClaimStatus
    {
        public int ClaimStatusId { get; set; }
        public string DisplayName { get; set; }
        public int? Count { get; set; }
    }
}
