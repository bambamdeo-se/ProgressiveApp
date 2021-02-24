using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Model
{
    public class Claim
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Company { get; set; }
        public int TaxFormId { get; set; }
        public string TaxForm { get; set; }
        public string FiledWith { get; set; }
        public DateTime BegDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime? DateFiled { get; set; }
        public decimal AmountFiled { get; set; }
    }
}
