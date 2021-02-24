using Microsoft.AspNetCore.Components;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class ClaimDetailsBase : ComponentBase
    {
        public static int Inject { get; private set; }
        [Parameter]
        public string Id { get; set; }
        public Claim ClaimData { get; set; } = new Claim();
        public IEnumerable<ClaimHierarchy> ClaimHierarchyList { get; set; } = new List<ClaimHierarchy>();
        public IEnumerable<ClaimTranscript> ClaimTranscriptList { get; set; } = new List<ClaimTranscript>();
        public IEnumerable<TaxForms> TaxFormList { get; set; } = new List<TaxForms>();
        public IEnumerable<Tenant> TenantList { get; set; } = new List<Tenant>();
        [Inject]
        public IClaimService ClaimService { get; set; }

        protected async override Task OnInitializedAsync()
        {
            int.TryParse(Id, out int claimId);
            if (claimId != 0)
            {
                ClaimData = await ClaimService.GetClaimById(claimId);
                ClaimHierarchyList = await ClaimService.GetClaimHierarchy(claimId);
                ClaimTranscriptList = await ClaimService.GetClaimTranscript(claimId);
                TaxFormList = await ClaimService.GetTaxForm();
                TenantList = await ClaimService.GetTenantList();

            }

        }
    }
}
