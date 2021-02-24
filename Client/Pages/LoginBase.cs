using Microsoft.AspNetCore.Components;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class LoginBase : ComponentBase
    {
        [Inject]
        public NavigationManager NavigationManager { get; set; }
        [Inject]
        public ILoginService LoginService { get; set; }

        public LoginModel LoginModel { get; set; } = new LoginModel();
        public async Task LoginUser()
        {
            await LoginService.LoginUser();
            NavigationManager.NavigateTo("/edit", true);
        }
    }
}
