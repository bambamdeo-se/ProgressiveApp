using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Model
{
    public class EditEmployeeModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [CompareProperty("Email", ErrorMessage = "Email and Confirm Email must match")]
        public string ConfirmEmail { get; set; }
        public DateTime DateOfBrith { get; set; }
        public Gender Gender { get; set; }
        //[ValidateComplexType]
        //public Department Department { get; set; } = new Department();
        public string PhotoPath { get; set; }
        public string Description { get; set; }
        public int? DepartmentId { get; set; }
    }
    public enum Gender
    {
        Male,
        Female,
        None
    }
}
