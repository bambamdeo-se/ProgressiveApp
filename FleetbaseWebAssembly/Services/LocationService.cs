using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using FleetbaseWebAssembly.Models;

namespace FleetbaseWebAssembly.Services
{
    public class LocationService : ILocationService
    {
        public readonly HttpClient _httpClient;
        public LocationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<List<Location>> GetLocation(int tenantId,int userId)
        {
            return await _httpClient.GetJsonAsync<List<Location>>($"GetLocation?tenantId={tenantId}&userId={userId}");
        }
    }
}
