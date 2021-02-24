using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Model
{
    public class ClaimTranscript
    {
        public int Id { get; set; }
        public int ClaimId { get; set; }
        public int? ClaimStatusId { get; set; }
        public string ClaimStatus { get; set; }
        public string CreatedBy { get; set; }
        public int CreatedByUserId { get; set; }
        public string Notes { get; set; }
        public DateTime EffectiveDate { get; set; }

    }
}
