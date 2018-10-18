using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IDatingRepository<User> _userRepo;
        private readonly IMapper _mapper;
        public UserController(IDatingRepository<User> userRepo, IMapper mapper)
        {
            _mapper = mapper;
            _userRepo = userRepo;

        }
        [HttpGet]
        public async Task<IActionResult> GetUsersAsync()
        {
            var users = await _userRepo.GetItems();
            var usersForList = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersForList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAsync(int id)
        {
            var user = await _userRepo.GetItem(id);
            var userForDetailed = _mapper.Map<UserForDetailedDto>(user);
            
            return Ok(userForDetailed);
        }


    }
}