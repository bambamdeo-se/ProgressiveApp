using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Model
{
    public class ClaimHierarchy
    {
        public int Id { get; set; }
        public int ClaimId { get; set; }
        public string HierarchyNode { get; set; }
        public string Description { get; set; }
        public decimal? CorrectedAmount { get; set; }
        public decimal RefundAmount { get; set; }
    }
}
