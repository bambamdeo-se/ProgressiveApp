using FleetbaseWebAssembly.Models;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using Microsoft.JSInterop;
using FleetbaseWebAssembly.Services;
using System.Net.Http;

namespace FleetbaseWebAssembly.Pages
{
    public class PopupBase : ComponentBase
    {
        [Inject]
        public ILocationService LocationService { get; set; }
        [Inject]
        public IJSRuntime JSRuntime { get; set; }
        [Inject]
        public HttpClient Http { get; set; }
        public string Id { get; set; }
        public Popup PopupModel { get; set; }
        public StateOrProvince[] DataSourceArrayStates { get; set; }
        public List<LookupItem> DropDownManager { get; set; } = new List<LookupItem>();
        public ObservableCollection<Contact> contactGridData { get; set; } = new ObservableCollection<Contact>();
        public Location Location { get; set; } = new Location();
        public string ModalDisplay = "none;";
        public string ModalClass = "";
        public bool ShowBackdrop = false;
        int userId = 1178;
        int tenantId = 0;
        public async Task SaveLocation(Location location)
        {
            await Http.PostJsonAsync($"UpdateLocation?userId={userId}", location);
            Close();
        }
               
        public async Task Open(int locationId)
        {
            ModalDisplay = "block;";
            ModalClass = "Show";
            ShowBackdrop = true;
            this.tenantId = Convert.ToInt32(await JSRuntime.InvokeAsync<string>("getTenant"));
            Location = await Http.GetJsonAsync<Location>($"GetLocationDetails?locationId={locationId}&userId={userId}");
            contactGridData = await Http.GetJsonAsync<ObservableCollection<Contact>>($"GetContactDetailsByLocation?locationId={locationId}&userId={userId}");
            DropDownManager = await Http.GetJsonAsync<List<LookupItem>>($"GetContactList?tenantId={tenantId}&userId={userId}&territoryId={null}&locationId={locationId}&query={string.Empty}");
            this.DataSourceArrayStates = await Http.GetJsonAsync<StateOrProvince[]>($"GetStates_Read?contextId={tenantId}&userId={userId}");
            StateHasChanged();
        }
        public void Close()
        {
            ModalDisplay = "none";
            ModalClass = "";
            ShowBackdrop = false;
            StateHasChanged();
        }
    }
}
