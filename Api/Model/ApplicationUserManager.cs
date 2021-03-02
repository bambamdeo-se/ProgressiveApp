using FleetbaseIdentityCore.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Model
{
    public class ApplicationUserManager : UserManager
    {
        public ApplicationUserManager(IdentityContext context) : base(context)
        {
        }

    }
}
