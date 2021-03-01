using System.Net.Http;
using System.Net.Http.Json;
using inbuild =System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Authorization;
using Client.Model;
using System.Security.Claims;
using Blazored.LocalStorage;
using System.IdentityModel.Tokens.Jwt;
using Claim = System.Security.Claims.Claim;
using System.Linq;
using System.Collections.Generic;

namespace Client
{
    public class CustomAuthenticationStateProvider : AuthenticationStateProvider
    {

        private readonly ILocalStorageService _storageService;

        public CustomAuthenticationStateProvider(ILocalStorageService storageService)
        {
            _storageService = storageService;
        }

        public async override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            if (await _storageService.ContainKeyAsync("User"))
            {
                var userInfo = await _storageService.GetItemAsync<User>("User");
                var handler = new JwtSecurityTokenHandler();
                var tokenS = handler.ReadJwtToken(userInfo.Token);
                var claimItems = tokenS.Claims.ToList();
                List<Claim> claims = new List<Claim>();
                foreach (var item in claimItems)
                {                  
                    claims.Add(new Claim(item.Type,item.Value));
                }
                //var claims = new[]
                //{
                //    new Claim("Email", claimItems["]),
                //    new Claim("FirstName", "achal"),
                //    new Claim("LastName", "parashar"),
                //    new Claim("AccessToken", userInfo.Token),
                //    new Claim(ClaimTypes.NameIdentifier, userInfo.UserId.ToString()),
                //};
                var identity = new ClaimsIdentity(claims, "BearerToken");
                var user = new ClaimsPrincipal(identity);
                var state = new AuthenticationState(user);
                NotifyAuthenticationStateChanged(Task.FromResult(state));
                return state;
            }

            return new AuthenticationState(new ClaimsPrincipal());
        }

        public async Task LogoutAsync()
        {
            await _storageService.RemoveItemAsync("User");
            NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(new ClaimsPrincipal())));
        }
    }
}
