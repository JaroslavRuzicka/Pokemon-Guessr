using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Pokemon")]
    public class Pokemon
    {
        public int Id { get; set; }        
        [StringLength(50)]
        public string  Name { get; set; } = string.Empty;  
        [StringLength(50)]
        public string Type { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Health { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Attack { get; set; }
        [StringLength(100)]
        public string Image { get; set; } = string.Empty;

        public List<Comment> Comment { get; set; } = [];
        public List<Team> Teams { get; set; } = [];
    }
}