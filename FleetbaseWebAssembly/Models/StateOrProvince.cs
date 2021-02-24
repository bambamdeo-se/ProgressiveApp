
namespace FleetbaseWebAssembly.Models
{
    public class StateOrProvince
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public short SortNbr { get; set; }
        public bool IsActive { get; set; }
        public int WeightUomId { get; set; }
        public string Abbreviation { get; set; }
    }
}
