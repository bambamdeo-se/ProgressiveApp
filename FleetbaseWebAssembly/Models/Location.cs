using System;


namespace FleetbaseWebAssembly.Models
{
    public class Location
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public int? TerritoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ParentName { get; set; }
        public string Breadcrumb { get; set; }
        public bool IsActive { get; set; }
        public int UnitCount { get; set; }
        public int? ManagerId { get; set; }
        public string Address1 { get; set; } = string.Empty;
        public string Address2 { get; set; } = string.Empty;
        public string City { get; set; }
        public int? StateOrProvinceId { get; set; }
        public string County { get; set; }
        public string PostalCode { get; set; }
        public string Wynne { get; set; }
        public string Lawson { get; set; }
        public DateTime? DateClosed { get; set; }
        public DateTime DateCreated { get; set; }
        public int CreatedById { get; set; }
        public DateTime? DateModified { get; set; }
        public int? ModifiedById { get; set; }
        public string ClosedByName { get; set; }
        public string LocationNbr { get; set; }
        public string Description { get; set; }
    }
}
