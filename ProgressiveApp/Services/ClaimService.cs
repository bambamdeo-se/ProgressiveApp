using ProgressiveApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Components;
using Newtonsoft.Json;

namespace ProgressiveApp.Services
{
    public class ClaimService : IClaimService
    {
        private readonly HttpClient _httpClient;
        int tenantId = 1;
        int userId = 2700;
        public ClaimService(HttpClient httpClient)
        {
            this._httpClient = httpClient;
        }

        public async Task<Claim> GetClaimById(int claimId)
        {
            Claim claim = null;
            ActionOutput<Claim> result = await _httpClient.GetJsonAsync<ActionOutput<Claim>>(
                $"Claim/GetClaimDetailsById?tenantid={tenantId}&userId={userId}&claimId={claimId}");
            if (result.Status == ActionStatus.Successfull)
            {
              return  claim = result.data as Claim;
            }
            else
              return  claim;
        }

        public async Task<IEnumerable<ClaimHierarchy>> GetClaimHierarchy(int claimId)
        {
            IEnumerable<ClaimHierarchy> hierarchy = null;
            ActionOutput<ClaimHierarchy> result = await _httpClient.GetJsonAsync<ActionOutput<ClaimHierarchy>>(
                $"Claim/GetClaimHierarchyListing?tenantid={tenantId}&userId={userId}&claimId={claimId}");
            if (result.Status == ActionStatus.Successfull)
            {
                hierarchy = result.Results as IEnumerable<ClaimHierarchy>;
            }
            else
                hierarchy = new List<ClaimHierarchy>();
            return hierarchy;
        }

        public async Task<IEnumerable<Claim>> GetClaimListingByStatus(int statusId)
        {
          
            IEnumerable<Claim> claim = null;
            ActionOutput<Claim> result = await _httpClient.GetJsonAsync<ActionOutput<Claim>>(
                $"Claim/GetClaimListingByStatus?tenantid={tenantId}&userId={userId}&statusId={statusId}");
            if (result.Status == ActionStatus.Successfull)
            {
                claim = result.Results as IEnumerable<Claim>;
            }
            else
                claim = new List<Claim>();
            return claim;
        }

        public async Task<IEnumerable<ClaimStatus>> GetClaimStatus()
        {
            IEnumerable <ClaimStatus> claimStatus = null;
            ActionOutput<ClaimStatus> result = await _httpClient.GetJsonAsync<ActionOutput<ClaimStatus>>($"Claim/GetClaimStatusList");
            if (result.Status == ActionStatus.Successfull)
            {
                claimStatus = result.Results as IEnumerable<ClaimStatus>;
            }
            else
                claimStatus = new List<ClaimStatus>();
            return claimStatus;
        }

        public async Task<IEnumerable<ClaimTranscript>> GetClaimTranscript(int claimId)
        {
            IEnumerable<ClaimTranscript> hierarchy = null;
            ActionOutput<ClaimTranscript> result = await _httpClient.GetJsonAsync<ActionOutput<ClaimTranscript>>(
                $"Claim/GetClaimTranscriptsListing?tenantid={tenantId}&userId={userId}&claimId={claimId}");
            if (result.Status == ActionStatus.Successfull)
            {
                hierarchy = result.Results as IEnumerable<ClaimTranscript>;
            }
            else
                hierarchy = new List<ClaimTranscript>();
            return hierarchy;
        }

        public async Task<IEnumerable<UnitImportActivitySession>> GetFuelRecords()
        {
            IEnumerable<UnitImportActivitySession> fuelResults = null;
            ActionOutput<UnitImportActivitySession> result = await _httpClient.GetJsonAsync<ActionOutput<UnitImportActivitySession>>
                ($"Location/ImportFuelFileSummary?activityId={4879}&tenantId={tenantId}&userId={userId}");

            Console.WriteLine($"Rsponse reciver from API {DateTime.Now}");
            if (result.Status == ActionStatus.Successfull)
            {
                fuelResults = result.Results as IEnumerable<UnitImportActivitySession>;
            }
            else
                fuelResults = new List<UnitImportActivitySession>();
            return fuelResults;          
        }
        public async Task<IEnumerable<TaxForms>> GetTaxForm()
        {
            IEnumerable<TaxForms> taxFormList = null;
            ActionOutput<TaxForms> result = await _httpClient.GetJsonAsync<ActionOutput<TaxForms>>($"Claim/GetTaxForms");
            if (result.Status == ActionStatus.Successfull)
            {
                taxFormList = result.Results as IEnumerable<TaxForms>;
            }
            else
                taxFormList = new List<TaxForms>();
            return taxFormList;
        }
        public async Task<IEnumerable<Tenant>> GetTenantList()
        {
            IEnumerable<Tenant> tenantList = null;
            ActionOutput<Tenant> result = await _httpClient.GetJsonAsync<ActionOutput<Tenant>>($"Tenant/GetTenantList?userId={userId}");
            if (result.Status == ActionStatus.Successfull)
            {
                tenantList = result.Results as IEnumerable<Tenant>;
            }
            else
                tenantList = new List<Tenant>();
            return tenantList;
        }

    }
}
