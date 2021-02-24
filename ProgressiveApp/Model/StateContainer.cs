using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Model
{
    public class StateContainer
    {
        public string Property { get; set; } = "Initial value from StateContainer";
        //public string Setting { get; set; }

        public event Action OnChange;

        public void SetProperty(string value)
        {
            Property = value;
            NotifyStateChanged();
        }

        private void NotifyStateChanged() => OnChange?.Invoke();
    }
}
