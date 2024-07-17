using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Threading.Tasks;
using Azure.Identity;

namespace api.Extensions
{
    public static class ClaimsExtensions
    {
        public static string? GetUserName (this ClaimsPrincipal user)
        {

            Claim? userNameClaim;
            string userName;
            try
            {
                userNameClaim = user.Claims.SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"));
                if (userNameClaim == null) return null;

                userName = userNameClaim.Value;
            }
            catch
            {
                return null;
            }
            
            return userName;
        }
    }
}