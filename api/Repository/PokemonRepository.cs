using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Pokemon;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Azure.Identity;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;


namespace api.Repository
{
    public class PokemonRepository : IPokemonRepository
    {

        private readonly ApplicationDBContext _context;
        public PokemonRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Pokemon>> GetAllAsync(QueryObject query)
        {
           var pokemons = _context.Pokemons.Include(c => c.Comment).ThenInclude(x => x.AppUser).AsQueryable();
            if(!string.IsNullOrWhiteSpace(query.Type))
            {
                pokemons = pokemons.Where(s => s.Type.Contains(query.Type));
            }

            if(!string.IsNullOrWhiteSpace(query.Name))
            {
                pokemons = pokemons.Where(s => s.Name.Contains(query.Name));
            }

            if(!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if(query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    pokemons = query.IsDescending ? pokemons.OrderByDescending(s => s.Name) : pokemons.OrderBy(s => s.Name);
                }
            }

            var skipNumber = (query.PageNumer - 1) * query.PageSize;

           return await pokemons.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Pokemon?> GetByIdAsync(int id)  
        {
            var pokemonModel = await _context.Pokemons.Include(c => c.Comment).FirstOrDefaultAsync(i => i.Id == id);

            if(pokemonModel == null) return null;

            return pokemonModel;
        }
        public async Task<Pokemon> CreateAsync(Pokemon pokemonModel)
        {
            await _context.Pokemons.AddAsync(pokemonModel);
            await _context.SaveChangesAsync();
            return pokemonModel;
        }
        public async Task<Pokemon?> UpdateAsync(int id, UpdatePokemonRequestDto pokemonDto)
        {
            var existingPokemon = await _context.Pokemons.FirstOrDefaultAsync(x => x.Id == id);

            if(existingPokemon == null) return null;

            existingPokemon.Name = pokemonDto.Name;
            existingPokemon.Type = pokemonDto.Type;
            existingPokemon.Health = pokemonDto.Health;
            existingPokemon.Attack = pokemonDto.Attack;
            existingPokemon.Image = pokemonDto.Image;

            await _context.SaveChangesAsync();

            return existingPokemon;
        }
        public async Task<Pokemon?> DeleteAsync(int id)
        {
            var pokemonModel = await _context.Pokemons.FirstOrDefaultAsync(x => x.Id == id);
            
            if(pokemonModel == null) return null;

            _context.Pokemons.Remove(pokemonModel);
            await _context.SaveChangesAsync();

            return pokemonModel;
        }


        public async Task<IEnumerable<Pokemon>?> GetByPartOfNameAsync(string name)
        {
            IEnumerable<Pokemon> pokemon = await _context.Pokemons.Include(c => c.Comment).Where(
                (pokemon) => pokemon.Name.ToString().Substring(0, name.Length).Contains(name.ToString())).ToListAsync();
            
            if(!pokemon.Any())
            {
                return null;
            }

            return pokemon;
        }

        public async Task<bool> PokemonExits(int id)
        {
            return await _context.Pokemons.AnyAsync(s => s.Id == id);
        }
        public async Task<Pokemon?> GetByNameAsync(string symbol)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            //If the s is null here it's not gonna match and that is fine with this condidtion.
            return await _context.Pokemons.FirstOrDefaultAsync<Pokemon?>(s => s.Name == symbol);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        }
    }
}