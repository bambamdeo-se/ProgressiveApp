using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class EmployeeListBase : ComponentBase
    {
        public IEnumerable<Employee> Employees { get; set; }
        protected int SelectedEmployeesCount { get; set; } = 0;
        [Inject]
        public IEmployeeService EmployeeService { get; set; }

        public bool ShowFooter { get; set; } = true;

        public IEnumerable<ClaimStatus> ClaimStatusList { get; set; } = new List<ClaimStatus>();
        public int SelectedStatusId { get; set; } = 0;
        [Inject]
        public IClaimService ClaimService { get; set; }
        protected override async Task OnInitializedAsync()
        {         
            Employees= await EmployeeService.GetEmployees();
        }
        protected void EmployeeSelectionChanged(bool isSelected)
        {
            if (isSelected)
            {
                SelectedEmployeesCount++;
            }
            else
            {
                SelectedEmployeesCount--;
            }
        }
        protected async Task EmployeeDeleted(int id)
        {
            Employees = (await EmployeeService.GetEmployees()).ToList();
        }
    }
}
