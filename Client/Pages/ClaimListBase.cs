using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Client.Model;
using Client.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Telerik.Blazor.Components;
using Telerik.Blazor.Components.Menu;
using Telerik.DataSource.Extensions;
namespace Client.Pages
{
    public class ClaimListBase : ComponentBase
    {
        public bool ShowContext { get; set; } = false;
        public TelerikContextMenu<MenuItem> ContextMenu { get; set; }
        public List<MenuItem> MenuItems { get; set; }
        public IEnumerable<ClaimStatus> ClaimStatusList { get; set; } = new List<ClaimStatus>();
        public IEnumerable<Claim> ClaimGrid { get; set; } = new List<Claim>();
        public TelerikGrid<Claim> GridRef { get; set; }
        public int SelectedStatusId { get; set; } = 0;
        [Inject]
        public IClaimService ClaimService { get; set; }
        [Inject]
        public NavigationManager NavigationManager { get; set; }
        public Claim SelectedClaim { get; set; }
        //public IEnumerable<Claim> SelectedItems { get; set; }  = Enumerable.Empty<Claim>();
        protected async override Task OnInitializedAsync()
        {
            ClaimStatusList = (await ClaimService.GetClaimStatus()).ToList();       
            MenuItems = new List<MenuItem>()
            {
                new MenuItem(){ Text = "Edit", Icon="edit", CommandName="Edit",Action=EditItem },
                new MenuItem(){ Text = "Delete", Icon="delete",CommandName="Delete",Action=DeleteItem }
            };
        }
        public async void MyOnChangeHandler(object theUserInput)
        {
            ClaimGrid = (await ClaimService.GetClaimListingByStatus(Convert.ToInt32(theUserInput))).ToList();
            StateHasChanged();
        }
       
       public void OnRowRenderHandler(GridRowRenderEventArgs args)
        {
            Claim item = args.Item as Claim;

            args.Class = "highlightCellBackGroud";
        }

        public void OnCellRenderHandler(GridCellRenderEventArgs args)
        {           
           args.Class = "border";           
        }

        public void HandleMouseUp(MouseEventArgs args)
        {
            ShowContext = true;
        }
        public async Task OnContextMenu(GridRowClickEventArgs args)
        {
            //map selected gr
            SelectedClaim = args.Item as Claim;
            
            //SelectedItems = new List<Claim> { SelectedClaim };
            if (args.EventArgs is MouseEventArgs mouseEventArgs && ShowContext )
            {
                //if(mouseEventArgs.ClientX < 400)
                await ContextMenu.ShowAsync(mouseEventArgs.ClientX, mouseEventArgs.ClientY);
                ShowContext = false;
            }
            
            StateHasChanged();
        }
        public async void OnStateChangedHandler(GridStateEventArgs<Claim> args)
        {
            Console.WriteLine(args.PropertyName); // get the setting that was just changed (paging, sorting,...)


            await GridRef.SetState(args.GridState);
        }
        public void OnItemClick(MenuItem item)
        {
            //Trigger Action mapped to the context menu
           
            item.Action.Invoke();
        }
        public void EditItem()
        {
            var argsItem = SelectedClaim;
           NavigationManager.NavigateTo($"/claimDetails/{SelectedClaim.Id}",false);
        }
        public void DeleteItem() // not async so it can be passed as an Action
        {
            var argsItem = SelectedClaim;
            // call the actual data service here
            SelectedClaim = null;
            //DepartmentList.Remove(argsItem);
        }
    }
}
