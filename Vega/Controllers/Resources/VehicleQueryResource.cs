using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vega.Controllers.Resources
{
    public class VehicleQueryResource
    {
        public int MakeId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public byte PageSize { get; set; }
        public int Page { get; set; }
    }
}
