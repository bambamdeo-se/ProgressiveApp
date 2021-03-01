using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Model
{
    public partial class User
    {
        public string UserId { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string Source { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePictureUrl { get; set; }
        public byte[] DateOfBirth { get; set; }
        public string AboutMe { get; set; }
        public long? Notifications { get; set; }
        public long? DarkTheme { get; set; }
        public byte[] CreatedDate { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
    }
}
