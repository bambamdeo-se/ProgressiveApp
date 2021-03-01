using Microsoft.AspNetCore.Components;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class VinDecoderBase : ComponentBase
    {
        [Inject]
        public IVinService VinService { get; set; }
        [Inject]
        public NavigationManager NavigationManager { get; set; }

        public IEnumerable<VinDecode> Vinlist { get; set; } = new List<VinDecode>();
            public IEnumerable<VinBatch> VinBatches { get; set; } = new List<VinBatch>();

        protected async override Task OnInitializedAsync()
        {
            Vinlist = await VinService.DecodeVINExtended();
            StateHasChanged();
            VinBatches = await VinService.DecodeVINBatchValue();
            Console.WriteLine("Result from api count: " + VinBatches.Count());

            Console.WriteLine("Result from api count: " + Vinlist.Count());
        }
    }
}
