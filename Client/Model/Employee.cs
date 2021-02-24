using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Model
{
    public class Employee
    {       
        public int EmployeeId { get; set; }
        [Required]
        [MinLength(2)]
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        [EmailDomainValidator(AllowedDomain = "necssolutions.com")]
        public string Email { get; set; }
        public DateTime DateOfBrith { get; set; }
        public int Gender { get; set; }
        public Department Department { get; set; } = new Department();
        public string PhotoPath { get; set; }
        public string Description { get; set; }
        public int? DepartmentId { get; set; }
    }
}
