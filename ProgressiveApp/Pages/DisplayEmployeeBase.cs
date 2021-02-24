using Microsoft.AspNetCore.Components;
using ProgressiveApp.Model;
using ProgressiveApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Pages
{
    public class DisplayEmployeeBase : ComponentBase
    {
        [Parameter]
        public Employee Employee { get; set; }

        [Parameter]
        public bool ShowFooter { get; set; }
        protected bool IsSelected { get; set; }

        [Parameter]
        public EventCallback<bool> OnEmployeeSelection { get; set; }
        [Parameter]
        public EventCallback<int> OnEmployeeDeleted { get; set; }

        [Inject]
        public NavigationManager NavigationManager { get; set; }
        [Inject]
        public IEmployeeService EmployeeService { get; set; }
        protected async Task CheckBoxChanged(ChangeEventArgs e)
        {
            IsSelected = (bool)e.Value;
            await OnEmployeeSelection.InvokeAsync(IsSelected);
        }
        //protected async Task Delete_Click()
        //{
        //    await EmployeeService.Delete(Employee.EmployeeId);
        //    await OnEmployeeDeleted.InvokeAsync(Employee.EmployeeId);
        //    //NavigationManager.NavigateTo("/", true);
        //}
        protected ConfirmBase DeleteConfirmation { get; set; }

        protected void Delete_Click()
        {
            DeleteConfirmation.Show();
        }
        protected async Task ConfirmDelete_Click(bool deleteConfirmed)
        {
            if (deleteConfirmed)
            {
                await EmployeeService.Delete(Employee.EmployeeId);
                //NavigationManager.NavigateTo("/", true);
                await OnEmployeeDeleted.InvokeAsync(Employee.EmployeeId);
            }
        }
    }
}
