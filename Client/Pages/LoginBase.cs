using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class LoginBase : ComponentBase
    {
        public User model { get; set; } = new User();
        public string Message { get; set; } = string.Empty;

        [Inject]
        public NavigationManager NavigationManager { get; set; }
        [Inject]
        public ILoginService LoginService { get; set; }
        [Inject]
        public ILocalStorageService storageService { get; set; }
        [Inject]
        public AuthenticationStateProvider authenticationStateProvider { get; set; }
        public LoginModel LoginModel { get; set; } = new LoginModel();
        public async Task LoginUser()
        {
            User response = await LoginService.LoginUser(model);
            if (response != null && !string.IsNullOrEmpty(response.Token))
            {
                Console.WriteLine(response.Token);
                await storageService.SetItemAsync("User", response);
                await authenticationStateProvider.GetAuthenticationStateAsync();
                NavigationManager.NavigateTo("/edit", true);
            }
            else if(response != null && !string.IsNullOrEmpty(response.Message))
                Message = response.Message;

            Console.WriteLine(response.Message);
        }
    }
}
