//using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Blazor.IndexedDB.WebAssembly;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.Services.AddScoped<IIndexedDbFactory, IndexedDbFactory>();
            builder.RootComponents.Add<App>("#app");
            builder.Services.AddOptions();
            builder.Services.AddAuthorizationCore();
          
            builder.Services.AddScoped<AuthenticationStateProvider, CustomAuthenticationStateProvider>();

            builder.Services.AddBlazoredLocalStorage();
            builder.Services.AddHttpClient<IVinService, VinService>(client =>
            {
                client.BaseAddress = new Uri("https://vpic.nhtsa.dot.gov/api");
            });
            builder.Services.AddCors(options =>
             {
                 options.AddDefaultPolicy(builder =>
                 builder.WithOrigins("https://vpic.nhtsa.dot.gov/api/")
                 .AllowAnyHeader()
                 .AllowCredentials()
                 .AllowAnyMethod());
             });
            
            builder.Services.AddTransient<IClaimService, ClaimService>();
            builder.Services.AddTransient<IEmployeeService, EmployeeService>();
            builder.Services.AddTransient<ILoginService, LoginService>();
            builder.Services.AddAutoMapper(typeof(EmployeeProfile));
            builder.Services.AddSingleton<StateContainer>();
            builder.Services.AddHttpClient<ILoginService, LoginService>(client =>
            {
                client.BaseAddress = new Uri("http://localhost:4975/");
            });
            builder.Services.AddScoped(sp =>
            new HttpClient
            {
                BaseAddress = new Uri("https://5ae8883add8f.ngrok.io/api/")
            });
            builder.Services.AddTelerikBlazor();
            await builder.Build().RunAsync();
        }
    }
}
