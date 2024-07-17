using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Pokemon;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class PokemonService : IPokemonService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public PokemonService (HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<Pokemon?> FindPokemonByNameAsync(string name)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon/{name}");

                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var task = JsonConvert.DeserializeObject<FetchedPokemon[]>(content);
                    if(task == null) return null;

                    var pokemon = task[0];

                    if(pokemon != null) return pokemon.ToPokemonFromFetchedPokemon();
                }

                return null;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}