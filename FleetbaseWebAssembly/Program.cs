using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;
using FleetbaseWebAssembly.Services;
using Microsoft.JSInterop;

namespace FleetbaseWebAssembly
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("app");
            builder.Services.AddTelerikBlazor();
            builder.Services.AddTransient<ILocationService,LocationService>();
   

            //Add base web Service url
            builder.Services.AddScoped(sp =>
            new HttpClient
            {
                BaseAddress = new Uri("http://localhost:61224/api/Location/")
            }) ;
           
            await builder.Build().RunAsync();
        }
        
    }
}