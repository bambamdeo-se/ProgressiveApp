
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Pages
{
    public class FuelSummaryBase : ComponentBase
    {
        public bool ExportAllPages { get; set; } = true;
        public bool IsLoading { get; set; }
        public bool exportClicked { get; set; }
        public  string GridClass { get; set; } = "FuelGrid";
        public string spinner { get; set; } = "SpinClass";
       public  string ExportBtnClass { get; set; } = "ExcelExportButton";
        [Inject]
        public IJSRuntime JSRuntime { get; set; }

        public IEnumerable<UnitImportActivitySession> FuelList { get; set; } = new List<UnitImportActivitySession>();
        [Inject]
        protected IClaimService FuelService { get; set; }
        protected async override Task OnInitializedAsync()
        {
            IsLoading = true;
            FuelList = (await FuelService.GetFuelRecords()).ToList();
            IsLoading = false;
        }
          
      
        public async Task MyExternalExportTrigger()
        {
            var selector = $".{ExportBtnClass}";
            await JSRuntime.InvokeVoidAsync("clickButton.clickElement", selector);
           }
        public async Task ShowLoader()
        {
            exportClicked = true;
            StateHasChanged();
            await Task.Delay(200000);
            exportClicked = false;

        }
    
    }
}
