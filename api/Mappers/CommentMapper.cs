using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;

namespace api.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            AppUser? AppUser = commentModel.AppUser;
            string userName;
            
            if(AppUser == null)
            {
                userName = "";
            }
            else
            {
                string? user = AppUser.UserName;
                if(user == null) 
                {
                    userName = "";
                }
                else{
                    userName = user;
                }
            }
            
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                Creator = userName,
                PokemonId = commentModel.PokemonId,
            };
        }

        public static Comment ToCommentFromCreteDto(this CreateCommentDto commentModel, int pokemonId)
        {
            return new Comment
            {
                Title = commentModel.Title,
                Content = commentModel.Content,
                PokemonId = pokemonId,
            };
        }

        public static Comment ToCommentFromUpdateDto(this UpdateCommentRequestDto commentModel)
        {
            return new Comment
            {
                Title = commentModel.Title,
                Content = commentModel.Content,
            };
        }
    }
}