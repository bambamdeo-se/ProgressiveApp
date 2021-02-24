using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Pages
{
    public class ConfirmBase : ComponentBase
    {
        protected bool ShowConfirmation { get; set; }

        [Parameter]
        public string ConfirmationTitle { get; set; } = "Confirm Delete";

        [Parameter]
        public string ConfirmationMessage { get; set; } = "Are you sure you want to delete";
        [Parameter]
        public bool ShowDeleteButton { get; set; }= true;

        public void Show()
        {
            ShowConfirmation = true;
            StateHasChanged();
        }

        [Parameter]
        public EventCallback<bool> ConfirmationChanged { get; set; }

        protected async Task OnConfirmationChange(bool value)
        {
            ShowConfirmation = false;
            await ConfirmationChanged.InvokeAsync(value);
        }

        public void Hide()
        {
            ShowConfirmation = false;
            StateHasChanged();
        }

    }
}
