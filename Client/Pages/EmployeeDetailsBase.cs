using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Client.Model;
using Client.Services;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class EmployeeDetailsBase : ComponentBase
    {
        [Inject]
        public IEmployeeService EmployeeService { get; set; }

        protected string Coordinates { get; set; }
        public Employee Employee { get; set; }

        [Parameter]
        public string Id { get; set; }

        protected async override Task OnInitializedAsync()
        {
            Id = Id ?? "1";
            Employee = await EmployeeService.GetEmployee(int.Parse(Id));
        }
        protected void Mouse_Move(MouseEventArgs e)
        {
            Coordinates = $"X = {e.ClientX } Y = {e.ClientY}";
        }
        public bool isVisible { get; set; } = false;

        public void ShowWindow()
        {
            isVisible = true;
        }

        public void CloseWindow()
        {
            isVisible = false;
        }
    }
}
