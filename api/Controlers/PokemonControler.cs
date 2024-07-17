using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Pokemon;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controlers
{
    [Route("api/pokemons")]
    [ApiController]

    public class PokemonControler : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IPokemonRepository _pokemonRepository;




        #region EC functions
        public PokemonControler(ApplicationDBContext context, IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
            _context = context;

        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var pokemons = await _pokemonRepository.GetAllAsync(query);
            var pokemonsDto = pokemons.Select(s => s.ToPokemonDto()).ToList();

            return Ok(pokemonsDto);
        }



        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var pokemon = await _pokemonRepository.GetByIdAsync(id);

            if(pokemon == null)
            {
                return NotFound();
            }

            return Ok(pokemon.ToPokemonDto());
        } 

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName([FromRoute] string name)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            IEnumerable<Models.Pokemon>? pokemon = await _pokemonRepository.GetByPartOfNameAsync(name);

            if(pokemon == null)
            {
                return NotFound();
            }

            return Ok(pokemon.Select(s => s.ToPokemonDto()));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePokemonRequestDto pokemonDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var existingPokemon = await _pokemonRepository.GetByNameAsync(pokemonDto.Name);
            if(existingPokemon != null) return Ok();
          
            var pokemonModel = pokemonDto.ToPokemonFromCreateDto();

            await _pokemonRepository.CreateAsync(pokemonModel);

            return CreatedAtAction(nameof(GetById), new {id = pokemonModel.Id}, pokemonModel.ToPokemonDto());
        }

        [HttpPut]
        [Route("{id:int}")]

        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePokemonRequestDto updateDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var pokemonModel = await _pokemonRepository.UpdateAsync(id, updateDto);

            if(pokemonModel == null)
            {
                return NotFound();
            }

            return Ok(pokemonModel.ToPokemonDto());

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var pokemonModel = await _pokemonRepository.DeleteAsync(id);

            if(pokemonModel == null)
            {
                return NotFound();
            }
            
            return NoContent();
        }

        #endregion
        

    }
}