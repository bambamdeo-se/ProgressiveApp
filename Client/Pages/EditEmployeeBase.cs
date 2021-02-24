using Microsoft.AspNetCore.Components;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class EditEmployeeBase : ComponentBase
    {
        public Employee Employee { get; set; }
       public string SelectedValue { get; set; }

        public List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
         };
        public IEnumerable<GenderModel> GenderOptions { get; set; } = new List<GenderModel>
            {
                new GenderModel { GenderId = 1, GenderText = "Female" },
                new GenderModel { GenderId = 2, GenderText = "Male" },
                new GenderModel { GenderId = 3, GenderText = "Other" },
                new GenderModel { GenderId = 4, GenderText = "Prefer not to say" },
            };
        public List<Department> DepartmentList { get; set; } = new List<Department>();
        [Inject]
        public IEmployeeService EmployeeService { get; set; }

        [Parameter]
        public string Id { get; set; }

        protected async override Task OnInitializedAsync()
        {
            
              
            DepartmentList = new List<Department>()
            {
                new Department { DepartmentId = 1, DepartmentName = "IT" },
                new Department { DepartmentId = 2, DepartmentName = "HR" },
                new Department { DepartmentId = 3, DepartmentName = "Finance" },
               
            };
            Employee = await EmployeeService.GetEmployee(int.Parse(Id));
            this.SelectedValue = "QA";
        }
    }
}
