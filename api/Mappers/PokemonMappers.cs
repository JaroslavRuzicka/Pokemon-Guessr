using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Pokemon;
using api.Models;

namespace api.Mappers
{
    public static class PokemonMappers
    {
        public static PokemonDto ToPokemonDto(this Pokemon pokemonModel)
        {
            return new PokemonDto
            {
                Id = pokemonModel.Id,
                Type = pokemonModel.Type,
                Name = pokemonModel.Name,
                Health = pokemonModel.Health,
                Attack = pokemonModel.Attack,
                Image = pokemonModel.Image,
                Comments = pokemonModel.Comment.Select(c => c.ToCommentDto()).ToList()

            };
        }
        public static Pokemon ToPokemonFromCreateDto(this CreatePokemonRequestDto pokemonDto)
        {
            return new Pokemon{
                Name = pokemonDto.Name,
                Type = pokemonDto.Type,
                Health = pokemonDto.Health,
                Attack = pokemonDto.Attack,
                Image = pokemonDto.Image,
            };
        }

        //This references returned value form fetch, that checks that the pokemon is correct
        public static Pokemon ToPokemonFromFetchedPokemon(this FetchedPokemon fetchedPokemon)
        {
            return new Pokemon{
                Name = fetchedPokemon.Name,
                Type = fetchedPokemon.Type,
                Health = fetchedPokemon.Health,
                Attack = fetchedPokemon.Attack,
                Image = fetchedPokemon.Image,
            };
        }
    }
}