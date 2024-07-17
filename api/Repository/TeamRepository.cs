using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class TeamRepository : ITeamRepository
    {
        private readonly ApplicationDBContext _context;

        public TeamRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Team> CreateTeamAsync(Team team)
        {
            await _context.Teams.AddAsync(team);
            await _context.SaveChangesAsync();

            return team;
        }

        public async Task<List<Pokemon>> GetUserTeam(AppUser user)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
//I am disableing the warning here because I want to pass in the empty string if there is no parameter.
            return await _context.Teams.Where(u => u.AppUserId == user.Id).Select(pokemon => new Pokemon
            {
                Id = pokemon.PokemonId,
                Name = pokemon.Pokemon.Name,
                Type = pokemon.Pokemon.Type,
                Health = pokemon.Pokemon.Health,
                Image = pokemon.Pokemon.Image,
            }).ToListAsync();
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        }


        public async Task<Team?> DeleteFromTeam(AppUser appUser, string symbol)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            //I am disableing the warning here because I want to pass in the empty string if there is no parameter.
            var teamModel = await _context.Teams.FirstOrDefaultAsync(
                x => x.AppUserId == appUser.Id 
                && x.Pokemon.Name.ToLower() == symbol.ToLower());
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            if (teamModel == null) return null;

        _context.Teams.Remove(teamModel);
        await _context.SaveChangesAsync();

        return teamModel;

        }

        public async Task<List<AppUser>> GetAllTeam()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
    }
}