using Server.Application.DTOs;
using Server.Application.Repositories;

namespace Server.Application.Services;

public interface IUserService
{
    Task<UserDto?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
}

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserDto?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetByIdAsync(id, cancellationToken);
        return user is null
            ? null
            : new UserDto(user.Id, user.Name, user.Username, user.Role, user.Team.Id);
    }
}
