using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Model
{
    public class UnitImportActivitySession
    {
        public string UnitNbr { get; set; }
        public string Jurisdiction { get; set; }
        public string City { get; set; }
        public string Vin { get; set; }
        public string SiteName { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public decimal? Quantity { get; set; }
        public string Country { get; set; }   
        public double Cost { get; set; }
        public string Address { get; set; }
        public int? Zip { get; set; }
        public string Comments { get; set; }
        public string Invoice { get; set; }
        public string ErrorMessage { get; set; }
        public string FuelType { get; set; }
        public string TrxNbr { get; set; }
        public string ActionType { get; set; }
    }
}
