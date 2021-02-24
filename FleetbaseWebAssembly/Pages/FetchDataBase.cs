using FleetbaseWebAssembly.Models;
using FleetbaseWebAssembly.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace FleetbaseWebAssembly.Pages
{
    public class FetchDataBase : ComponentBase
    { 
        [Inject]
        public ILocationService LocationService { get; set; }
        [Inject]
        public IJSRuntime JSRuntime { get; set; }

        public Popup PopupModel { get; set; }
        public ObservableCollection<Location> gridData { get; set; }
        public IEnumerable<Location> SelectedItems { get; set; } = Enumerable.Empty<Location>();
        public Location SelectedLocation { get; set; }
        int tenatId = 0;
        int userId = 1178;
        protected override async Task OnInitializedAsync()
        {
            this.tenatId = Convert.ToInt32(await JSRuntime.InvokeAsync<string>("getTenant"));
            await LoadData(tenatId);
        }
        public async Task LoadData(int tenatId)
        {
            var locationsData = await LocationService.GetLocation(tenatId, userId);
           gridData = new ObservableCollection<Location>(locationsData);
        }
        public async void OnSelect(IEnumerable<Location> locations)
        {
            this.SelectedLocation = locations.FirstOrDefault();
            this.SelectedItems = new List<Location> { SelectedLocation };
            await PopupModel.Open(SelectedLocation.Id);
        }          
    }
}
