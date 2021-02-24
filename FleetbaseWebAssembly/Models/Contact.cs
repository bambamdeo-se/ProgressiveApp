
namespace FleetbaseWebAssembly.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public int? TerritoryId { get; set; }
        public int? TerritoryContactId { get; set; }
        public int? LocationId { get; set; }
        public int? LocationContactId { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string JobTitle { get; set; }
        public string EmployeeNbr { get; set; }
        public string OfficePhone { get; set; }
        public string OfficeExt { get; set; }
        public string HomePhone { get; set; }
        public string MobilePhone { get; set; }
        public string Fax { get; set; }
        public bool IsActive { get; set; }
        public bool VHS { get; set; }
        public bool TRS { get; set; }
        public bool DRS { get; set; }
        public bool? HasUserRecord { get; set; }
        public int UserId { get; set; }
    }
}
