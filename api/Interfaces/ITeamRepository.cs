using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ITeamRepository
    {
        public Task<List<Pokemon>> GetUserTeam(AppUser user);
        public Task<List<AppUser>> GetAllTeam();
        public Task<Team> CreateTeamAsync(Team team); 
        public Task<Team?> DeleteFromTeam(AppUser appUser, string name);
    }
}