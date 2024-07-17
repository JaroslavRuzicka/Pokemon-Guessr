using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Pokemon
{
    public class UpdatePokemonRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 characters.")]
        public string Name { get; set; } = string.Empty;  
        [Required]
        [MaxLength(10, ErrorMessage = "Company name cannot be over 10 characters.")]
        public string Type { get; set; } = string.Empty;
        [Required]
        [Range(1, 1000000000)]        
        public decimal Health { get; set; }
        [Required]
        [Range(0.001, 100)]        
        public decimal Attack { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "Industry name cannot be over 100 characters.")]        
        public string Image { get; set; } = string.Empty;      
    }
}