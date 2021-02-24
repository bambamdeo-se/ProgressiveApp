using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProgressiveApp.Model
{
    public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            CreateMap<Employee, EditEmployeeModel>()
                .ForMember(dest => dest.ConfirmEmail,
                           opt => opt.MapFrom(src => src.Email));
            CreateMap<EditEmployeeModel, Employee>();
        }
    }
}
