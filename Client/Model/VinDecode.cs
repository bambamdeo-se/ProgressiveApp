using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Model
{
    public class VinDecode
    {
        public string BodyClass { get; set; }
        public string Make { get; set; }
        public string VIN { get; set; }
        public int MakeId { get; set; }
        public string Manufacturer { get; set; }
        public int ManufacturerId { get; set; }
        public string Model { get; set; }
        public int ModelId { get; set; }
        public string Trim { get; set; }
        public string FuelType { get; set; }


    }
}
