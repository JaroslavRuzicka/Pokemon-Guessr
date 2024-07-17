using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controlers
{
    [Route("api/teams")]
    [ApiController]
    public class TeamControler : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IPokemonRepository _pokemonRepositroy;
        private readonly ITeamRepository _teamRepository;
        private readonly IPokemonService _pokemonService;

        public TeamControler(UserManager<AppUser> userManager, IPokemonRepository 
        pokemonRepository, ITeamRepository teamRepository, IPokemonService pokemonService)
        {
            _userManager = userManager;
            _pokemonRepositroy = pokemonRepository;
            _teamRepository = teamRepository;
            _pokemonService = pokemonService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserTeam()
        {
            var userName = User.GetUserName();
            if(userName == null) return NotFound();

            var appUser = await _userManager.FindByNameAsync(userName);
            if(appUser == null) return NotFound();

            var userTeam = await _teamRepository.GetUserTeam(appUser);

            return Ok(userTeam);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddTeam(string name)
        {
            var userName = User.GetUserName();
            if(userName == null) return NotFound();

            var appUser = await _userManager.FindByNameAsync(userName);
            if(appUser == null) return NotFound();

            var pokemon = await _pokemonRepositroy.GetByNameAsync(name);
            if(pokemon == null) return BadRequest("This Pokemon does not exists.");


            var userTeam = await _teamRepository.GetUserTeam(appUser);

            if(userTeam.Any(pokemon => pokemon.Name.ToLower() == name.ToLower())) return BadRequest("You aleready have this pokemon inside of your team.");

            var teamModel = new Team
            {
                PokemonId = pokemon.Id,
                AppUserId = appUser.Id
            };

            await _teamRepository.CreateTeamAsync(teamModel);

            if(teamModel == null) 
            {
                return StatusCode(500, "Team was not created");
            }
            else
            {
                return Created();
            }    
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteFromTeam(string name)
        {
            var userName = User.GetUserName();
            if(userName == null) return NotFound();

            var appUser = await _userManager.FindByNameAsync(userName);
            if(appUser == null) return NotFound();

            var userTeam = await _teamRepository.GetUserTeam(appUser);

            var filteredPokemon = userTeam.Where(s => s.Name.ToLower() == name.ToLower()).ToList();

            if(filteredPokemon.Count() == 1)
            {
                await _teamRepository.DeleteFromTeam(appUser, name);
            }
            else
            {
                return BadRequest("Pokemon not found");
            }

            return NoContent();
        }

        [HttpGet]
        [Route("leaderboard")]
        public async Task<IActionResult> GetLeaderBoard()
        {
            
            var users = await _teamRepository.GetAllTeam();

            List<LeaderBoard> teams = [];

            foreach(var user in users)
            {
                
                
                var userTeam = await _teamRepository.GetUserTeam(user);
                if(userTeam.Any()) teams.Add(
                    new LeaderBoard
                    {
                        UserName = user.UserName!,
                        Pokemons = userTeam,
                    });
            }

            if(teams == null) return NotFound("No teams on the leaderboard");

            return Ok(teams);
        }
    }
}