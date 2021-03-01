using Microsoft.AspNetCore.Components;
using Newtonsoft.Json;
using Client.Model;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;


namespace Client.Services
{
    public class LoginService: ILoginService
    {
        private readonly HttpClient _httpClient;
        public LoginService(HttpClient httpClient)
        {
            this._httpClient = httpClient;
        }
        public async Task<User> LoginUser(User user)
        {
            try
            {
                var response = await _httpClient.PostJsonAsync<User>($"user/loginUser", user);
                response.Password = string.Empty;
                return response;
            }
            catch(Exception ex)
            {
                return new User(){ Message = ex.Message };
            }
        }
    }
}
