using System.ComponentModel.DataAnnotations;

namespace Vega.Controllers.Resources
{
    public class ContactResouce
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}