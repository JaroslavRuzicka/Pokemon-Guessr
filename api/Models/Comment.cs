using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string Title { get; set; } = string.Empty;
        [StringLength(250)]
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? PokemonId { get; set; }
        public Pokemon? Pokemon { get; set; }
        [StringLength(450)]
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
    }
}