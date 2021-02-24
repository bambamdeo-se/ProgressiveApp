using AutoMapper;
using Microsoft.AspNetCore.Components;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class EditEmployeeNewBase : ComponentBase
    {
        private Employee Employee { get; set; }
        public string PageHeader { get; set; }
        public EditEmployeeModel EditEmployeeModel { get; set; } = new EditEmployeeModel();
        public string DepartmentId { get; set; }
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
        [Inject]
        public IMapper Mapper { get; set; }
        [Parameter]
        public string Id { get; set; }

        [Inject]
        public NavigationManager NavigationManager { get; set; }
        protected async override Task OnInitializedAsync()
        {          
            int.TryParse(Id, out int employeeId);
            if(employeeId !=0)
            {
                Employee = await EmployeeService.GetEmployee(int.Parse(Id));
                PageHeader = "Edit Employee";
                DepartmentId = "2";
            }
            else
            {
                Employee = new Employee
                {
                    DepartmentId = 1,
                    DateOfBrith = DateTime.Now,
                    PhotoPath = "images/nophoto.jpg"
                };
                PageHeader = "Create Employee";
            }
            Mapper.Map(Employee, EditEmployeeModel);
            DepartmentList = new List<Department>()
            {
                new Department { DepartmentId = 1, DepartmentName = "IT" },
                new Department { DepartmentId = 2, DepartmentName = "HR" },
                new Department { DepartmentId = 3, DepartmentName = "Finance" },
            };
        }
        protected async void HandleValidSubmit()
        {
            Mapper.Map(EditEmployeeModel, Employee);

            Employee result = null;

            if (Employee.EmployeeId != 0)
            {
                result = await EmployeeService.UpdateEmployee(Employee);
            }
            else
            {
                result = await EmployeeService.CreateEmployee(Employee);
            }
            if (result != null)
            {
                NavigationManager.NavigateTo("/");
            }
        }

        protected async Task Delete_Click()
        {
            await EmployeeService.Delete(Employee.EmployeeId);
            NavigationManager.NavigateTo("/");
        }
    }

}
