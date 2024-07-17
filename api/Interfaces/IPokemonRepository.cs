using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Pokemon;
using api.Helpers;
using api.Models;
using api.Repository;

namespace api.Interfaces
{
    public interface IPokemonRepository
    {
        public Task<List<Pokemon>> GetAllAsync(QueryObject query);
        public Task<Pokemon?> GetByIdAsync(int id);
        public Task<Pokemon> CreateAsync(Pokemon pokemonModel);
        public Task<Pokemon?> UpdateAsync(int id, UpdatePokemonRequestDto pokemonDto);
        public Task<Pokemon?> DeleteAsync(int id);
        public Task<IEnumerable<Pokemon>?> GetByPartOfNameAsync(string id);
        public Task<Pokemon?> GetByNameAsync(string name);
        public Task<bool> PokemonExits(int id);


    }
}