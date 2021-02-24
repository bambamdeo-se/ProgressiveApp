//using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Blazor.IndexedDB.WebAssembly;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ProgressiveApp.Model;
using ProgressiveApp.Services;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ProgressiveApp
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.Services.AddScoped<IIndexedDbFactory, IndexedDbFactory>();
            builder.RootComponents.Add<App>("#app");
            builder.Services.AddOptions();
            //builder.Services.AddHttpClient<IClaimService, ClaimService>(client=> {
            //    client.BaseAddress = new Uri("http://localhost:61224/api/");
            //});
            builder.Services.AddTransient<IClaimService, ClaimService>();
            builder.Services.AddAuthorizationCore(); 
            builder.Services.AddTransient<IEmployeeService, EmployeeService>();
            builder.Services.AddTransient<ILoginService, LoginService>();
            builder.Services.AddAutoMapper(typeof(EmployeeProfile));
            builder.Services.AddSingleton<StateContainer>();
            builder.Services.AddScoped(sp =>
            new HttpClient
            {
                BaseAddress = new Uri("http://localhost:60000/api/")
            });
            builder.Services.AddTelerikBlazor();
            //builder.Services.AddScoped<IIndexedDbFactory, IndexedDbFactory>();
            await builder.Build().RunAsync();
        }
    }
}
