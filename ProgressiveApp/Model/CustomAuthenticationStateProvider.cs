using Microsoft.AspNetCore.Components.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProgressiveApp.Model
{
    public class CustomAuthenticationStateProvider : AuthenticationStateProvider
    {

        private readonly HttpClient _httpClient;

        public CustomAuthenticationStateProvider(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        //public async override Task<AuthenticationState> GetAuthenticationStateAsync()
        //{
        //    //UserModel currentUser = await Task.FromResult(new UserModel());
        //    //currentUser.EmailAddress = "achal.parashar@gmail.com";
        //    //if (currentUser != null && currentUser.EmailAddress != null)
        //    //{
        //    //    //create a claim
        //    //    //var claim = new Claim(ClaimTypes.Name, currentUser.EmailAddress);
        //    //    ////create claimsIdentity
        //    //    //var claimsIdentity = new ClaimsIdentity(new[] { claim }, "serverAuth");
        //    //    ////create claimsPrincipal
        //    //    //var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

        //    //    return new AuthenticationState(claimsPrincipal);
        //    //}
        //    //else
        //    //    return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity()));
        //}
    }
}
