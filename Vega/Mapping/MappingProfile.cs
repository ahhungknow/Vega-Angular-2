using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using Vega.Controllers.Resources;
using Vega.Core.Models;
using Vega.Models;

namespace Vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Domain to API Resources
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr=>vr.Contact,opt=>opt.MapFrom(v=>new ContactResouce { Name=v.ContactName,Email=v.ContactEmail,Phone=v.ContactPhone}))
                .ForMember(vr=>vr.Features,opt=>opt.MapFrom(v=>v.Features.Select(vf=>vf.FeatureId)));
            CreateMap<Vehicle,VehicleResource>()
                .ForMember(vr=>vr.Make,opt=>opt.MapFrom(v=>v.Model.Make))
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResouce { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource { Id=vf.Feature.Id,Name=vf.Feature.Name})));
            //API Resources to Domain
            CreateMap<VehicleQueryResource, VehicleQuery>();
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.Features, opt => opt.MapFrom(vr => vr.Features.Select(id => new VehicleFeature { FeatureId = id })))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    //var removedFeatures = new List<VehicleFeature>();
                    ////Remove unselected features
                    var removedFeatures=v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
                    foreach(var f in removedFeatures.ToList())
                    {
                        v.Features.Remove(f);
                    }
                    //Add new features
                    var addedFeatures= vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id=>new VehicleFeature {FeatureId=id });
                    foreach(var f in addedFeatures)
                    {
                        v.Features.Add(f);
                    }
                });
        }
    }
}