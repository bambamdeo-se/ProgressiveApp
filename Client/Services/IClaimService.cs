using Client.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Services
{
    public interface IClaimService
    {
        Task<IEnumerable<ClaimStatus>> GetClaimStatus();
        Task<IEnumerable<Claim>>  GetClaimListingByStatus(int statusId);
        Task<IEnumerable<UnitImportActivitySession>> GetFuelRecords();
        Task<Claim> GetClaimById(int claimId);
        Task<IEnumerable<ClaimHierarchy>> GetClaimHierarchy(int claimId);
        Task<IEnumerable<ClaimTranscript>> GetClaimTranscript(int claimId);
        Task<IEnumerable<TaxForms>> GetTaxForm();
        Task<IEnumerable<Tenant>> GetTenantList();
    }
}
