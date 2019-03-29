using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Core.Models;
using Vega.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id,bool includeRelated=true);
        Task<QueryResult<Vehicle>> GetVehicle(VehicleQuery filter);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}
