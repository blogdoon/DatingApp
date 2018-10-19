using System.Collections.Generic;
using System.Security.Claims;
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _userRepo.GetItem(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _userRepo.SaveAll())
            {
                return NoContent();
            }
            throw new System.Exception($"Exception saving user with id: {id}.");

        }

    }
}