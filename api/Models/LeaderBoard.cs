using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class LeaderBoard
    {
        public string UserName { get; set; } = string.Empty;
        public List<Pokemon> Pokemons  = [];
    }
}