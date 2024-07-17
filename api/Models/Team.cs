using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Teams")]
    public class Team
    {
        [StringLength(450)]
        public string? AppUserId { get; set; }   
        public int PokemonId { get; set; }
        public AppUser? AppUser { get; set; }
        public Pokemon? Pokemon { get; set; }
    }
}