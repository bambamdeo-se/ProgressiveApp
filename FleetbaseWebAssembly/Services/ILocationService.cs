using FleetbaseWebAssembly.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FleetbaseWebAssembly.Services
{
    public interface ILocationService
    {
        Task<List<Location>> GetLocation(int tenantId, int userId);
    }
}
