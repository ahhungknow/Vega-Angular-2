using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Controllers.Resources;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    public class MakesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;

        public MakesController(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await context.Makes.Include(x => x.Models).ToListAsync();
            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}