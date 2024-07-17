using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controlers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentControler : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPokemonRepository _pokemonRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPokemonService _pokemonService;

        public CommentControler(ICommentRepository commentRepository, IPokemonRepository pokemonRepository,
        UserManager<AppUser> userManager, IPokemonService pokemonService)
        {
            _commentRepository = commentRepository;
            _pokemonRepository = pokemonRepository;
            _userManager = userManager;
            _pokemonService = pokemonService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery]CommentQueryObject queryObject)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var comments = await _commentRepository.GetAllAsync(queryObject);
            var commentsDto = comments.Select(x => x.ToCommentDto());
            
            return Ok(commentsDto);
        }
        
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var comment = await _commentRepository.GetByIdAsync(id);

            if(comment == null) return NotFound();

            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{name}/{user}")]
        public async Task<IActionResult> Create([FromRoute] string name, CreateCommentDto commentDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var pokemon = await _pokemonRepository.GetByNameAsync(name);
            if(pokemon == null) return BadRequest("This Pokemon does not exists.");


            var userName = User.GetUserName();
            if(userName == null) return BadRequest("No user found.");

            var appUser = await _userManager.FindByNameAsync(userName);
            if(appUser == null) return BadRequest("No user found.");

            var commentModel = commentDto.ToCommentFromCreteDto(pokemon.Id);
            commentModel.AppUserId = appUser.Id;

            await _commentRepository.CreateAsync(commentModel);

            return CreatedAtAction(nameof(GetById), new {id = commentModel.Id, pokemonId = pokemon.Id}, commentModel.ToCommentDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var comment = await _commentRepository.UpdateAsync(id, updateDto.ToCommentFromUpdateDto());

            if(comment == null) return NotFound("Comment not found");



            
            return Ok(comment.ToCommentDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var commentModel = await _commentRepository.DeleteAsync(id);

            if(commentModel == null) return NotFound("Comment does no exist");

            return Ok(commentModel.ToCommentDto());
        }


    }
}